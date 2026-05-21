import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';
import { ITaskFormModalData } from '../../interfaces/task-form-modal-data.interface';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ITaskFormControls } from '../../interfaces/task-form-controls.interface';

@Component({
  selector: 'app-task-form-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-modal.component.html',
  styleUrl: './task-form-modal.component.css',
})
export class TaskFormModalComponent {
  // Recupera os dados injetados no modal (modo e valores iniciais)
  readonly _data: ITaskFormModalData = inject(DIALOG_DATA);
  // Referência para controlar o fechamento do modal e retornar os dados tipados
  readonly _dialogRef = inject(DialogRef);

  // Inicialização do formulário reativo.
  // Os valores iniciais vêm de '_data', permitindo que o formulário funcione
  // tanto para criação (vazio) quanto para edição (com dados pré-existentes).
  taskForm: FormGroup = new FormGroup({
    name: new FormControl(this._data.formValues.name, [
      Validators.required,
      Validators.minLength(10),
    ]),
    description: new FormControl(this._data.formValues.description, [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  // Método chamado ao submeter o formulário no HTML
  onFormSubmit() {
    this.closeModal(this.taskForm.value);
  }

  // Fecha o modal enviando os dados do formulário de volta para o chamador
  closeModal(formValues: ITaskFormControls | undefined = undefined) {
    this._dialogRef.close(formValues);
  }
}
