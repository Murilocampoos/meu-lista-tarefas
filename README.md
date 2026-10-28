# 📋 Minhas Tarefas (To-Do List)

## 📖 Sobre o Projeto
Aplicativo mobile desenvolvido para o gerenciamento de tarefas diárias. O sistema permite ao usuário adicionar, editar, excluir e marcar tarefas como concluídas, organizando a rotina de forma eficiente. O app conta com filtros dinâmicos integrados para visualização (Todas, Pendentes e Concluídas) e garante a persistência completa dos dados localmente no dispositivo.

O desenvolvimento focou em boas práticas de engenharia de software, implementando a separação de responsabilidades com o **Repository Pattern**, isolamento de regras de negócio em **Custom Hooks** e tipagem estrita.

## 🚀 Tecnologias Utilizadas
- **React Native & Expo:** Framework principal (SDK 57).
- **Expo Router:** Navegação em pilha (Stack) baseada no sistema de arquivos.
- **SQLite (`expo-sqlite`):** Banco de dados local configurado com Singleton e modo WAL (Write-Ahead Log) para alta performance de escrita.
- **NativeWind (Tailwind CSS v4):** Estilização de interface totalmente baseada em classes utilitárias.
- **TypeScript:** Tipagem estrita de entidades, propriedades (props) e DTOs, sem uso de `any`.

## ✨ Funcionalidades Implementadas
- [x] **CRUD Completo:** Cadastro (com título obrigatório e descrição opcional), leitura, edição e exclusão de tarefas.
- [x] **Gestão de Estado Centralizada:** Uso do hook customizado `useTasks` com `useFocusEffect` e `useCallback` para manter os dados da interface sempre sincronizados com o banco de dados.
- [x] **Filtros e Contadores Dinâmicos:** Barra de navegação que filtra as tarefas em tempo real (Todas, Pendentes, Concluídas) e exibe as quantidades atualizadas.
- [x] **Design Seguro (UX):** Emissão de alerta de confirmação (`Alert.alert`) antes da exclusão de qualquer registro, prevenindo toques acidentais.
- [x] **Persistência Comprovada:** O banco SQLite retém com segurança todos os estados (concluídas/pendentes) mesmo após o encerramento total do aplicativo em background.

## 📁 Arquitetura e Estrutura
- `app/`: Telas e rotas principais (`_layout.tsx`, `index.tsx`, `form.tsx`).
- `src/components/`: Componentes visuais desacoplados (`TaskItem.tsx`, `FilterBar.tsx`, `EmptyState.tsx`).
- `src/hooks/`: Lógica de gerenciamento de estado da interface e chamadas ao banco (`useTasks.ts`).
- `src/database/`: Regras de persistência sem dependência do React (`database.ts`, `taskRepository.ts`).
- `src/types/`: Interfaces de contrato (`task.ts`).

##  Demonstração

Abaixo estão algumas capturas de tela do aplicativo rodando nativamente no dispositivo físico através do Expo Go:

<p align="center">
  

https://github.com/user-attachments/assets/70efef7d-7d1b-4415-9d0f-d1c2f4e69beb

-Tela de Cadastro.
-Listagem de Tarefas.
-Exclusão com Confirmação.
-Edição de Tarefa.

<img width="391" height="869" alt="image" src="https://github.com/user-attachments/assets/4298b529-76e3-4e76-bc30-0ed87ec02b31" width="250" />
<img width="391" height="869" alt="image" src="https://github.com/user-attachments/assets/73a1ba81-0e45-4670-8161-24eff9c7a939" width="250" />
<img width="391" height="869" alt="image" src="https://github.com/user-attachments/assets/70a6fb2c-f234-4f8a-8cef-a9f38692a5b1" width="250" />
<img width="391" height="869" alt="image" src="https://github.com/user-attachments/assets/f4f85db7-3c81-4088-b4c1-789d8aab5dbf" width="250" />
<img width="391" height="869" alt="image" src="https://github.com/user-attachments/assets/a76c5962-627c-4d47-98ff-b481aaaa92d3" width="250" />

</p>
