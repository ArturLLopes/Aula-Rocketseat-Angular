import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "../interfaces/task.interface";
import { ITaskFormControls } from "../interfaces/task-form-controls.interface";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { generateUniqueIdWithTimestamp } from "../utils/generate-unique-id-with-timestamps";


@Injectable({
  providedIn: 'root',
})

export class TaskService {

  private todoTask$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTask = this.todoTask$.asObservable();

  private doingTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTask = this.doingTask$.asObservable();

  private doneTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTask = this.doneTask$.asObservable();

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
}
