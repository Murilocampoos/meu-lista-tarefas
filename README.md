# 📝 Meu Lista de Tarefas

Aplicativo móvel desenvolvido para acompanhamento e entregas da disciplina de Programação Mobile do curso de Análise e Desenvolvimento de Sistemas (FATEC).

## Tecnologias Utilizadas

O projeto foi estruturado com as tecnologias e bibliotecas mais modernas do ecossistema mobile:

* **React Native** (com framework **Expo SDK 57**)
* **TypeScript** para tipagem estática e segurança do código
* **NativeWind** (TailwindCSS) para estilização utilitária
* **Expo SQLite** para persistência de dados local
* **Expo Router** para navegação baseada em arquivos

  ## Status do Desenvolvimento

O aplicativo está sendo construído em etapas. Até o momento, o *core* da aplicação e a camada de dados foram finalizados:

- [x] **Etapas 1 a 4:** Configuração inicial do projeto, instalação de dependências, setup do Expo Router e configuração global do NativeWind.
- [x] **Etapa 5:** Criação das interfaces e tipagens em TypeScript (`Task`, `CreateTaskInput`, etc).
- [x] **Etapas 6 e 7:** Implementação do banco de dados local com SQLite (utilizando modo WAL para performance) e isolamento das operações CRUD no `taskRepository.ts`.
- [x] **Etapa 8:** Criação do hook customizado `useTasks.ts` para gerenciar os estados, filtros e contadores das tarefas (utilizando `useCallback` e `useFocusEffect`).
- [x] **UI Temporária:** Tela inicial de "Em construção" centralizada e estilizada com NativeWind.

##  Demonstração

Abaixo estão algumas capturas de tela do aplicativo rodando nativamente no dispositivo físico através do Expo Go:

<p align="center">
  <img width="360" height="800" alt="image" src="https://github.com/user-attachments/assets/6e17ab88-e432-4ec6-ac9a-ed6e934dea6b" width="250" />
  <img width="360" height="800" alt="image" src="https://github.com/user-attachments/assets/9dafaa55-109a-412b-8380-4637c4727aef" width="250" />
  <img width="360" height="800" alt="image" src="https://github.com/user-attachments/assets/e16ddf93-c681-4cfe-ae36-daed459a9c60" width="250" />

  * **Tela temporária para mudar um pouquinho ;)**
  <img width="360" height="911" alt="image" src="https://github.com/user-attachments/assets/5b108621-5b96-4b65-8b92-ebb9632bcf3a" />


</p>

