import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css',
})
export class WelcomeSectionComponent {
  // Injeção de dependências usando o padrão funcional inject()
  private readonly _modalControllerService = inject(ModalControllerService);
  private readonly _taskService = inject(TaskService);

  // Método disparado pela UI para iniciar a criação de uma nova tarefa
  openNewTaskModal() {
    // Delega a responsabilidade de configuração e abertura do modal para um serviço especializado
    const dialogRef = this._modalControllerService.openNewTaskModal();

    // Subscreve-se ao evento de fechamento para capturar os dados retornados
    dialogRef.closed.subscribe((taskForm) => {
      // Validação lógica: só prossegue se o usuário confirmou a ação (taskForm não é undefined)
      if (taskForm) {
        // Persiste a nova tarefa através do serviço de estado global/negócio
        this._taskService.addTask(taskForm);
      }
    });
  }
}
