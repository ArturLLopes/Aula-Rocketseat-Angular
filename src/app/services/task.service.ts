import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ITask } from "../interfaces/task.interface";


@Injectable({
  providedIn: 'root',
})

export class TaskService {
  private todoTask$ = new BehaviorSubject<ITask[]>([]);
  readonly todoTask = this.todoTask$.asObservable();


  private doingTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doingTask = this.todoTask$.asObservable();



  private doneTask$ = new BehaviorSubject<ITask[]>([]);
  readonly doneTask = this.todoTask$.asObservable();


}
