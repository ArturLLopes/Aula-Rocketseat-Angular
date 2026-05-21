import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ITaskFormControls } from '../../interfaces/task-form-controls.interface';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IComment } from '../../interfaces/comment.interface';
import { generateUniqueIdWithTimestamp } from '../../utils/generate-unique-id-with-timestamps';
import { ITask } from '../../interfaces/task.interface';

@Component({
  selector: 'app-task-comments-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  // Referência ao input para manipulação direta do DOM (foco)
  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;

  // Injeção dos dados da tarefa recebidos ao abrir o modal
  readonly _task: ITask = inject(DIALOG_DATA);
  // Referência para fechar o modal, retornando um booleano (se houve alteração)
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  // Controle reativo para o campo de texto do comentário
  commentControl = new FormControl('', [Validators.required]);

  // Flag para monitorar se a lista de comentários foi alterada durante a sessão
  taskCommentsChanged = false;

  onAddComment() {
    // Criação do novo objeto de comentário com ID único
    const newComment: IComment = {
      id: generateUniqueIdWithTimestamp(),
      description: this.commentControl.value ? this.commentControl.value : '',
    };

    // Adiciona o comentário no início do array para melhor visibilidade (UX)
    this._task.comments.unshift(newComment);

    // Limpa o campo de entrada após a adição bem-sucedida
    this.commentControl.reset();

    // Sinaliza que houve alteração para o componente chamador
    this.taskCommentsChanged = true;

    // Devolve o foco ao input para facilitar a adição de múltiplos comentários
    this.commentInputRef.nativeElement.focus();
  }

  // Fecha o modal enviando o estado de alteração
  onCloseModal(formValues: ITaskFormControls | undefined = undefined) {
    this._dialogRef.close(this.taskCommentsChanged);
  }

  onRemoveComment(commentId: string) {
    // Filtra a lista removendo o item específico por ID
    this._task.comments = this._task.comments.filter(
      (comment) => comment.id !== commentId,
    );

    // Sinaliza alteração após a remoção
    this.taskCommentsChanged = true;
  }
}
