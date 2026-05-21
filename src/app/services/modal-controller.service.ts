import { inject, Injectable } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { TaskFormModalComponent } from '../components/task-form-modal/task-form-modal.component';
import { TaskCommentsModalComponent } from '../components/task-comments-modal/task-comments-modal.component';
import { ITaskFormControls } from '../interfaces/task-form-controls.interface';
import { ITask } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalControllerService {
  // Opções de tamanho padrão para os modais, garantindo consistência visual.
  private readonly modalSizeOptions = {
    maxWidth: '620px', // Largura máxima do modal.
    width: '95%', // Largura do modal (95% do contêiner pai).
  };

  // Injeta o serviço Dialog do Angular CDK usando a nova função `inject()`.
  private readonly _dialog = inject(Dialog);

  /**
   * Abre o modal para criar uma nova tarefa.
   * @returns Uma referência ao diálogo aberto, que pode ser usada para interagir com ele (ex: fechar, obter resultado).
   */
  openNewTaskModal() {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions, // Aplica as opções de tamanho padrão.
      disableClose: true, // Impede que o modal seja fechado clicando fora ou com a tecla ESC.
      data: {
        // Dados passados para o componente do modal.
        mode: 'create', // Indica que o modal está no modo de criação.
        formValues: {
          // Valores iniciais do formulário (vazios para nova tarefa).
          name: '',
          description: '',
        },
      },
    });
  }

  /**
   * Abre o modal para editar uma tarefa existente.
   * @param formValues Os valores atuais da tarefa para preencher o formulário.
   * @returns Uma referência ao diálogo aberto.
   */
  openEditTaskModal(formValues: ITaskFormControls) {
    return this._dialog.open<ITaskFormControls>(TaskFormModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: {
        mode: 'edit', // Indica que o modal está no modo de edição.
        formValues, // Passa os valores da tarefa existente para o formulário.
      },
    });
  }

  /**
   * Abre o modal para visualizar e adicionar comentários a uma tarefa.
   * @param task A tarefa cujos comentários serão exibidos/editados.
   * @returns Uma referência ao diálogo aberto.
   */
  openTaskCommentsModal(task: ITask) {
    return this._dialog.open(TaskCommentsModalComponent, {
      ...this.modalSizeOptions,
      disableClose: true,
      data: task, // Passa o objeto da tarefa completa para o modal de comentários.
    });
  }
}
