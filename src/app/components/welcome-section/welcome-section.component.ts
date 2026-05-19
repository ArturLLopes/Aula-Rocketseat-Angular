import { Component, inject } from '@angular/core';
import { ModalControllerService } from '../../services/modal-controller.service';

@Component({
  selector: 'app-welcome-section',
  imports: [],
  templateUrl: './welcome-section.component.html',
  styleUrl: './welcome-section.component.css'
})
export class WelcomeSectionComponent {
  private readonly _modalController = inject(ModalControllerService);

  openNewTaskModal() {
    this._modalController.openNewTaskModal();
  }
}
