import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { ITaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-timestamps';
import { TaskStatus } from '../types/task-status';
import { IComment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root', 
})
export class TaskService {
  // ==========================================================================
  // GESTÃO DE ESTADO COM RXJS (BehaviorSubject)
  // ==========================================================================

  // BehaviorSubject para as tarefas com status 'TODO'.
  // Ele é inicializado carregando as tarefas do localStorage para o status 'TODO'.
  private todoTask$ = new BehaviorSubject<ITask[]>(this.loadTasksFormLocalStore(TaskStatusEnum.TODO));
  // Observable público para as tarefas 'TODO'.
  // O pipe `map(structuredClone)` garante que uma cópia profunda do array seja retornada,
  // prevenindo modificações diretas externas que poderiam quebrar a reatividade.
  // O `tap` é usado para salvar as tarefas no localStorage sempre que o stream emitir um novo valor.
  readonly todoTask = this.todoTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskOnLocalStorage(TaskStatusEnum.TODO, tasks)),
  );

  // BehaviorSubject e Observable para as tarefas com status 'DOING'.
  private doingTask$ = new BehaviorSubject<ITask[]>(this.loadTasksFormLocalStore(TaskStatusEnum.DOING));
  readonly doingTask = this.doingTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskOnLocalStorage(TaskStatusEnum.DOING, tasks)),
  );

  // BehaviorSubject e Observable para as tarefas com status 'DONE'.
  private doneTask$ = new BehaviorSubject<ITask[]>(this.loadTasksFormLocalStore(TaskStatusEnum.DONE));
  readonly doneTask = this.doneTask$.asObservable().pipe(
    map((tasks) => structuredClone(tasks)),
    tap((tasks) => this.saveTaskOnLocalStorage(TaskStatusEnum.DONE, tasks)),
  );

  // ==========================================================================
  // MÉTODOS DE MANIPULAÇÃO DE TAREFAS
  // ==========================================================================

  /**
   * Adiciona uma nova tarefa à lista de 'TODO'.
   * @param taskInfos Dados do formulário da nova tarefa.
   */
  addTask(taskInfos: ITaskFormControls) {
    const newTask: ITask = {
      ...taskInfos, // Copia as informações do formulário.
      status: TaskStatusEnum.TODO, // Define o status inicial como 'TODO'.
      id: generateUniqueIdWithTimestamp(), // Gera um ID único para a tarefa.
      comments: [], // Inicializa a lista de comentários vazia.
    };

    const currentList = this.todoTask$.value; // Obtém o valor atual do BehaviorSubject 'todoTask$'.

    // Emite um novo array para 'todoTask$' com a nova tarefa adicionada.
    // Isso aciona o `tap` no observable `todoTask` para salvar no localStorage.
    this.todoTask$.next([...currentList, newTask]);
  }

  /**
   * Atualiza o status de uma tarefa, movendo-a entre as listas (TODO, DOING, DONE).
   * @param taskId ID da tarefa a ser atualizada.
   * @param taskCurrentStauts Status atual da tarefa.
   * @param taskNextStatus Novo status da tarefa.
   */
  updateTaskStatus(
    taskId: string,
    taskCurrentStauts: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    // Obtém os BehaviorSubjects correspondentes ao status atual e próximo.
    const currentTaskList = this.getTaskListByStatus(taskCurrentStauts);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);

    // Encontra a tarefa na lista atual.
    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus; // Atualiza o status da tarefa.

      // Cria uma nova lista para o status atual, removendo a tarefa que foi movida.
      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]); // Emite a lista atualizada.

      // Adiciona a tarefa movida à nova lista de status.
      nextTaskList.next([...nextTaskList.value, { ...currentTask }]); // Emite a nova lista.
    }
  }

  /**
   * Atualiza o nome e a descrição de uma tarefa.
   * @param taskId ID da tarefa.
   * @param taskCurrentsStatus Status atual da tarefa.
   * @param newTaskName Novo nome da tarefa.
   * @param newTaskDescription Nova descrição da tarefa.
   */
  updateTaskNameAndDescription(
    taskId: string,
    taskCurrentsStatus: TaskStatus,
    newTaskName: string,
    newTaskDescription: string,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentsStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );

    if (currentTaskIndex > -1) {
      const updateTaskList = [...currentTaskList.value]; // Cria uma cópia do array para imutabilidade.

      // Atualiza as propriedades da tarefa específica.
      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      };

      currentTaskList.next(updateTaskList); // Emite a lista atualizada.
    }
  }

  /**
   * Atualiza os comentários de uma tarefa.
   * @param taskId ID da tarefa.
   * @param taskCurrentStatus Status atual da tarefa.
   * @param newTaskComments Novos comentários da tarefa.
   */
  updateTaskComments(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    newTaskComments: IComment[],
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);
    const currentTaskIndex = currentTaskList.value.findIndex(
      (task) => task.id === taskId,
    );

    if (currentTaskIndex > -1) {
      const updateTaskList = [...currentTaskList.value]; // Cria uma cópia do array.

      // Atualiza a lista de comentários da tarefa.
      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        comments: [...newTaskComments], // Garante que os comentários também sejam imutáveis.
      };

      currentTaskList.next(updateTaskList); // Emite a lista atualizada.
    }
  }

  /**
   * Exclui uma tarefa da lista.
   * @param taskId ID da tarefa a ser excluída.
   * @param taskCurrentStatus Status atual da tarefa.
   */
  deleteTask(taskId: string, taskCurrentStatus: TaskStatus) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStatus);

    // Filtra a tarefa a ser removida, criando um novo array.
    const newTaskList = currentTaskList.value.filter(
      (task) => task.id !== taskId,
    );

    currentTaskList.next(newTaskList); // Emite a lista atualizada.
  }

  // ==========================================================================
  // PERSISTÊNCIA DE DADOS (LOCALSTORAGE)
  // ==========================================================================

  /**
   * Carrega as tarefas do localStorage com base em uma chave (status da tarefa).
   * @param key Chave do localStorage (ex: 'TODO', 'DOING', 'DONE').
   * @returns Um array de tarefas ou um array vazio em caso de erro ou ausência de dados.
   */
  private loadTasksFormLocalStore(key: string): ITask[] {
    try {
      const storedTasks = localStorage.getItem(key);
      return storedTasks ? JSON.parse(storedTasks) : []; // Converte a string JSON de volta para objeto.
    } catch (error) {
      console.error('Erro ao carregar tarefas do localStorage:', error);
      return [];
    }
  }

  /**
   * Salva um array de tarefas no localStorage com uma chave específica.
   * @param key Chave do localStorage.
   * @param task Array de tarefas a ser salvo.
   */
  private saveTaskOnLocalStorage(key: string, tasks: ITask[]): void {
    try {
      localStorage.setItem(key, JSON.stringify(tasks)); // Converte o array de objetos para string JSON.
    } catch (error) {
      console.error('Erro ao salvar tarefas no localStorage:', error);
    }
  }

  /**
   * Método auxiliar para obter o BehaviorSubject correto com base no status da tarefa.
   * @param taskStatus Status da tarefa.
   * @returns O BehaviorSubject correspondente.
   */
  private getTaskListByStatus(taskStatus: TaskStatus): BehaviorSubject<ITask[]> {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTask$,
      [TaskStatusEnum.DOING]: this.doingTask$,
      [TaskStatusEnum.DONE]: this.doneTask$,
    };
    return taskListObj[taskStatus];
  }
}
