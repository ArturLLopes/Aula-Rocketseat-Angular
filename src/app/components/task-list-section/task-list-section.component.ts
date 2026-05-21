import { Component, inject } from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';
import { TaskService } from '../../services/task.service';
import {
  CdkDropList,
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ITask } from '../../interfaces/task.interface';
import { AsyncPipe } from '@angular/common';
import { TaskStatus } from '../../types/task-status';
import { TaskStatusEnum } from '../../enums/task-status.enum';

@Component({
  selector: 'app-task-list-section',
  imports: [TaskCardComponent, CdkDropList, CdkDrag, AsyncPipe],
  templateUrl: './task-list-section.component.html',
  styleUrl: './task-list-section.component.css',
})
export class TaskListSectionComponent {
  readonly _taskService = inject(TaskService);

  // Método principal disparado pelo evento de soltar (drop) do CDK
  onCardDrop(event: CdkDragDrop<ITask[]>) {
    // 1. Atualiza a posição visual do card no array local
    this.moveCardToColumn(event);

    // 2. Extrai as informações necessárias do item arrastado e do destino
    const taskId = event.item.data.id;
    const taskCurrentStatus = event.item.data.status;
    const droppedColumn = event.container.id;

    // 3. Sincroniza a mudança com o serviço (estado global/localStorage)
    this.updateTaskStatus(taskId, taskCurrentStatus, droppedColumn);
  }

  // Traduz o ID do container HTML para o Enum de status da regra de negócio
  private updateTaskStatus(
    taskId: string,
    taskCurrentStatus: TaskStatus,
    droppedColumn: string,
  ) {
    let taskNextStatus: TaskStatus;

    switch (droppedColumn) {
      case 'to-do-column':
        taskNextStatus = TaskStatusEnum.TODO;
        break;
      case 'doing-column':
        taskNextStatus = TaskStatusEnum.DOING;
        break;
      case 'done-column':
        taskNextStatus = TaskStatusEnum.DONE;
        break;
      default:
        throw Error('Coluna inválida');
    }

    this._taskService.updateTaskStatus(
      taskId,
      taskCurrentStatus,
      taskNextStatus,
    );
  }

  // Lógica de manipulação de arrays do CDK para refletir a mudança na UI
  private moveCardToColumn(event: CdkDragDrop<ITask[]>) {
    // Se o item foi solto na mesma coluna, apenas reordena o array
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    } else {
      // Se mudou de coluna, transfere o item de um array para o outro
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
