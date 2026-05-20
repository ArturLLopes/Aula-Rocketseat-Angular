import { TaskStatus } from "../types/task-status";
import { IComment } from "./comment.interface";

export interface ITask {
  id: number;
  nome: string;
  descricao: string;
  comments: IComment[];
  status: TaskStatus;
}
