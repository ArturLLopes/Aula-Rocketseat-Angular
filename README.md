<div align="center">

# 🚀 Aula Rocketseat — Angular

**Projeto desenvolvido durante o desafio prático de Angular da [Rocketseat](https://www.rocketseat.com.br/), aplicando conceitos modernos do framework em um cenário real de mercado.**

[![Angular](https://img.shields.io/badge/Angular-19.2-DD0031?style=for-the-badge&logo=angular&logoColor=white)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![RxJS](https://img.shields.io/badge/RxJS-7.8-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)](https://rxjs.dev)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://netlify.com)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Arquitetura e Decisões Técnicas](#-arquitetura-e-decisões-técnicas)
- [Pré-requisitos](#-pré-requisitos)
- [Como Rodar o Projeto](#-como-rodar-o-projeto)
- [Scripts Disponíveis](#-scripts-disponíveis)
- [Estrutura de Pastas](#-estrutura-de-pastas)
- [Deploy](#-deploy)
- [Autor](#-autor)

---

## 💡 Sobre o Projeto

Este repositório contém uma aplicação moderna desenvolvida durante a trilha de Angular da Rocketseat. O projeto foca na criação de um ToDoTask e a nova arquitetura de estilos com **Tailwind CSS v4**.

**Destaques técnicos:**

- **Arquitetura 100% Standalone**: Sem o uso de `NgModules`.
- **Tailwind CSS v4**: Integração via PostCSS aproveitando a nova engine de alta performance.
- **Estrutura Public-first**: Uso da pasta `public/` para assets, seguindo os padrões das versões 18 e 19.
- **Pronto para Produção**: Configuração completa de CI/CD para Netlify com gestão de rotas SPA.

---

## 🛠 Tecnologias Utilizadas

### Core

| Tecnologia     | Versão | Por que foi utilizada                                                                                                                                                                                                                      |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Angular**    | 19.2   | Framework front-end estruturado, amplamente adotado no mercado corporativo. Oferece um ecossistema completo com roteamento, formulários, injeção de dependência e CLI — reduzindo decisões de arquitetura e padronizando a base de código. |
| **TypeScript** | 5.7    | Superset do JavaScript que adiciona tipagem estática, melhorando a manutenibilidade, o autocompletar da IDE e a detecção de erros em tempo de desenvolvimento. É o padrão do Angular e uma exigência de mercado.                           |
| **RxJS**       | 7.8    | Biblioteca de programação reativa usada internamente pelo Angular (ex: `HttpClient`, `Router`). Permite lidar com eventos assíncronos e streams de dados de forma declarativa e eficiente.                                                 |

### Estilização

| Tecnologia       | Versão | Por que foi utilizada                                                                                                                                                                                                                                        |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Tailwind CSS** | 4.1    | Framework CSS utilitário que permite estilizar componentes diretamente no template HTML, sem criar arquivos `.css` extras. Agiliza o desenvolvimento, mantém consistência visual e o build final elimina automaticamente classes não utilizadas via `purge`. |
| **Angular CDK**  | 19.2   | Kit de desenvolvimento de componentes do Angular. Fornece primitivos de UI acessíveis e prontos (overlay, drag-and-drop, virtual scroll), sem impor estilos — perfeito para compor com Tailwind.                                                             |
| **PostCSS**      | 8.5    | Processador de CSS necessário para que o Tailwind CSS v4 funcione no pipeline de build do Angular. Configurado via `.postcssrc.json`.                                                                                                                        |

### Qualidade de Código

| Tecnologia       | Por que foi utilizada                                                                                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Prettier**     | Formatador de código opinativo que garante estilo consistente em toda a base, eliminando discussões de estilo em code reviews. Configurado com o plugin `eslint-plugin-prettier` para integração com o linter. |
| **EditorConfig** | Arquivo `.editorconfig` na raiz garante que todos os editores (VS Code, WebStorm etc.) apliquem as mesmas regras de indentação, charset e fim de linha — independente do sistema operacional do desenvolvedor. |

### Testes

| Tecnologia          | Por que foi utilizada                                                                                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Karma + Jasmine** | Stack de testes padrão do Angular CLI. Karma é o test runner que executa os testes no browser, e Jasmine é o framework de assertion. Configurado com `karma-coverage` para métricas de cobertura de código. |

### Deploy

| Tecnologia  | Por que foi utilizada                                                                                                                                                                                                                                                                                                          |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Netlify** | Plataforma de deploy contínuo com CDN global. O `netlify.toml` na raiz configura automaticamente o comando de build (`ng build --configuration=production`) e o diretório de publicação, além de redirecionar todas as rotas para o `index.html` — necessário para o roteamento client-side do Angular funcionar corretamente. |

---

## 🏗 Arquitetura e Decisões Técnicas

### Angular Standalone Components

O projeto utiliza a **API de componentes standalone** (disponível a partir do Angular 15, padrão no v17+), eliminando a necessidade de `NgModules` para declarar componentes. Isso simplifica a estrutura da aplicação, facilita o tree-shaking e torna o lazy loading mais granular.

### Tailwind CSS v4 com PostCSS

A integração do **Tailwind v4** com Angular requer a configuração via `@tailwindcss/postcss` no arquivo `.postcssrc.json`, diferente das versões anteriores que usavam `tailwind.config.js`. Essa abordagem delega o processamento das classes utilitárias ao pipeline CSS do Angular CLI.

### Configuração de Environments

Utilizando os `environments` nativos do Angular (`environment.ts` / `environment.prod.ts`), é possível trocar variáveis como URLs de API automaticamente conforme o `--configuration` passado no build — sem expor dados sensíveis e sem alterar código manualmente entre deploys.

---

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) — versão **22.x (LTS)** recomendada
- [npm](https://www.npmjs.com/) — versão **10+** (incluído com o Node.js)
- [Angular CLI](https://angular.dev/tools/cli) — versão **19.x**

```bash
# Instalar o Angular CLI globalmente
npm install -g @angular/cli@19
```

---

## 🚀 Como Rodar o Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/ArturLLopes/Aula-Rocketseat-Angular.git

# 2. Acesse a pasta do projeto
cd Aula-Rocketseat-Angular

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm start
```

Acesse em: **http://localhost:4200**

> A aplicação recarrega automaticamente ao salvar qualquer arquivo fonte.

---

## 📜 Scripts Disponíveis

| Comando         | Descrição                                                |
| --------------- | -------------------------------------------------------- |
| `npm start`     | Inicia o servidor de desenvolvimento em `localhost:4200` |
| `npm run build` | Gera o build de produção em `/dist`                      |
| `npm run watch` | Build em modo watch (desenvolvimento contínuo)           |
| `npm run lint`  | Executa a análise estática do código                     |
| `npm test`      | Executa os testes unitários com Karma                    |

---

## 📁 Estrutura de Pastas

```
Aula-Rocketseat-Angular/
project/
├── public/
│   ├── images/
│   └── favicon.ico
└── src/
    └── app/
        ├── components/
        │   ├── header/
        │   ├── main-content/
        │   ├── task-card/
        │   ├── task-comments-modal/
        │   ├── task-form-modal/
        │   ├── task-list-section/
        │   └── welcome-section/
        ├── enums/
        │   └── task-status.enum.ts
        ├── interfaces/
        │   ├── comment.interface.ts
        │   ├── task-form-controls.interface.ts
        │   ├── task-form-modal-data.interface.ts
        │   └── task.interface.ts
        ├── services/
        │   ├── modal-controller.service.ts
        │   └── task.service.ts
        ├── types/
        │   └── task-status.ts
        ├── utils/
        │   └── generate-unique-id-with-timestamps.ts
        ├── app.component.css/html/spec.ts/ts
        ├── app.config.ts
        └── app.routes.ts
```

---

## 🌐 Deploy

O projeto está configurado para deploy automático na **Netlify**. O arquivo `netlify.toml` define:

```toml
[build]
command = "ng build --configuration=production"
publish = "dist/aula-rocketseat-angular/browser"

[[redirects]]
from = "/"
to = "/index.html"
status = 200
```

> O redirect `/ → /index.html` é essencial para que o Angular Router funcione corretamente em produção, evitando erros 404 ao acessar rotas diretamente via URL.

---

## 👤 Autor

Feito com 💜 por **Artur L. Lopes** durante o desafio da Rocketseat.

[![GitHub](https://img.shields.io/badge/GitHub-ArturLLopes-181717?style=flat-square&logo=github)](https://github.com/ArturLLopes)

---

<div align="center">
  <sub>Desenvolvido durante o <strong>Desafio Angular na Prática</strong> · <a href="https://www.rocketseat.com.br">Rocketseat</a></sub>
</div>
