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
  @ViewChild('commentInput') commentInputRef!: ElementRef<HTMLInputElement>;

  readonly _task: ITask = inject(DIALOG_DATA);
  readonly _dialogRef: DialogRef<boolean> = inject(DialogRef);

  commentControl = new FormControl('', [Validators.required]);
  taskCommentsChanged = false;

  onAddComment() {
    console.log('Comentario', this.commentControl.value);

    const newComment: IComment = {
      id: generateUniqueIdWithTimestamp(),
      description: this.commentControl.value ? this.commentControl.value : '',
    };

    this._task.comments.unshift(newComment);

    this.commentControl.reset();

    this.taskCommentsChanged = true;

    this.commentInputRef.nativeElement.focus();
  }

  onCloseModal(formValues: ITaskFormControls | undefined = undefined) {
    this._dialogRef.close(this.taskCommentsChanged);
  }

  onRemoveComment(commentId: string) {
    this._task.comments = this._task.comments.filter(
      (comment) => comment.id !== commentId,
    );

    this.taskCommentsChanged = true;
  }
}
