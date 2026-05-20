import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { ITaskFormControls } from '../interfaces/task-form-controls.interface';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { generateUniqueIdWithTimestamp } from '../utils/generate-unique-id-with-timestamps';
import { TaskStatus } from '../types/task-status';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private todoTask$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTask = this.todoTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  private doingTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTask = this.doingTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  private doneTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTask = this.doneTask$
    .asObservable()
    .pipe(map((tasks) => structuredClone(tasks)));

  addTask(taskInfos: ITaskFormControls) {
    const newTask: ITask = {
      ...taskInfos,
      status: TaskStatusEnum.TODO,
      id: generateUniqueIdWithTimestamp(),
      comments: [],
    };

    const currentList = this.todoTask$.value;

    this.todoTask$.next([...currentList, newTask]);
  }

  updateTaskStatus(
    taskId: string,
    taskCurrentStauts: TaskStatus,
    taskNextStatus: TaskStatus,
  ) {
    const currentTaskList = this.getTaskListByStatus(taskCurrentStauts);
    const nextTaskList = this.getTaskListByStatus(taskNextStatus);

    const currentTask = currentTaskList.value.find(
      (task) => task.id === taskId,
    );

    if (currentTask) {
      currentTask.status = taskNextStatus;

      const currentTaskListWithoutTask = currentTaskList.value.filter(
        (task) => task.id !== taskId,
      );
      currentTaskList.next([...currentTaskListWithoutTask]);

      nextTaskList.next([...nextTaskList.value, { ...currentTask }]);
    }
  }

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
      const updateTaskList = [...currentTaskList.value];

      updateTaskList[currentTaskIndex] = {
        ...updateTaskList[currentTaskIndex],
        name: newTaskName,
        description: newTaskDescription,
      };

      currentTaskList.next(updateTaskList);
    }
  }

  private getTaskListByStatus(taskStatus: TaskStatus) {
    const taskListObj = {
      [TaskStatusEnum.TODO]: this.todoTask$,
      [TaskStatusEnum.DOING]: this.doingTask$,
      [TaskStatusEnum.DONE]: this.doneTask$,
    };
    return taskListObj[taskStatus];
  }
}
