import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    MainContentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  // teste dos modais
  // private readonly _modalControllerService = inject(ModalControllerService);

  // openModal() {
  //   this._modalControllerService.openTaskCommentsModal();
  // }
}
