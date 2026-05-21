import { Component, inject } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { MainContentComponent } from './components/main-content/main-content.component';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent, // Importa o componente de cabeçalho (Standalone), permitindo seu uso direto no template.
    MainContentComponent, // Importa o container principal que gerencia as seções de tarefas e boas-vindas.
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
/**
 * AppComponent: O componente raiz da aplicação.
 * Nesta arquitetura standalone, ele funciona como o orquestrador principal,
 * declarando as dependências de UI necessárias para montar a casca (shell) do sistema.
 */
export class AppComponent {}
