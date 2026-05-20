import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ITaskFormControls } from '../../interfaces/task-form-controls.interface';

@Component({
  selector: 'app-task-comments-modal',
  imports: [],
  templateUrl: './task-comments-modal.component.html',
  styleUrl: './task-comments-modal.component.css',
})
export class TaskCommentsModalComponent {
  readonly _task = inject(DIALOG_DATA);
  readonly _dialogRef = inject(DialogRef);

  closeModal(formValues: ITaskFormControls | undefined = undefined) {
    this._dialogRef.close(formValues);
  }
}
