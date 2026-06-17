FitTech - Sistema de Gestão de Treinos para Academias

Sobre o Projeto

O FitTech é um aplicativo mobile desenvolvido em React Native com Expo e Supabase, voltado para o gerenciamento de treinos em academias.

A aplicação possui dois perfis de acesso:

* Aluno
* Instrutor

Os instrutores podem cadastrar alunos, criar treinos e adicionar exercícios. Já os alunos podem visualizar seus treinos, acompanhar o progresso dos exercícios e consultar informações do perfil.

Tecnologias Utilizadas

 Frontend

* React Native
* Expo
* TypeScript
* React Navigation

 Backend e Banco de Dados

* Supabase
* PostgreSQL
* Supabase Authentication

 Bibliotecas

* Expo Image Picker
* React Native Safe Area Context
* React Native Vector Icons

 Funcionalidades

 Autenticação

* Cadastro de usuários
* Login
* Logout
* Controle de permissões por perfil (Aluno e Instrutor)

 Área do Aluno

* Visualização dos treinos cadastrados
* Execução dos exercícios
* Controle de séries concluídas
* Barra de progresso dos exercícios
* Perfil do usuário

 Área do Instrutor

* Cadastro de treinos
* Cadastro de exercícios
* Visualização de alunos
* Associação de treinos aos alunos
* Acompanhamento dos treinos cadastrados

 Estrutura do Projeto
 
```bash
src/ 
|--assets/	
|    |-logo.png
|    |_logofit.png
|    	
|
|--components/
|	      |-Button/
|	      |    |-index.tsx
|       |    |_styles.ts
|       |
|       |-CustomTabBarAluno/
|       |    |-index.tsx
|       |    |_styles.ts
|       |
|       |
|       |-CustomTabBarInstrutor/
|       |    |-index.tsx
|       |    |_styles.ts
|       |
|       |
|       |-input/
|       |    |-index.tsx
|       |    |_styles.ts
|       |
|       |_Screen/
|           |_index.tsx
|
|
|
|--context/
|       |_AuthContext.tsx
|
|
|
|--global/
|     |_themes.tsx
|
|
|--pages/
|    |
|    |-aluno/
|    |   |
|    |	 |
|    |   |-execucaoTreino/
|    |   |	    |
|    |   |      |-ExercicioTreino.styles.ts
|    |   |      |_ExercicioTreiono.tsx
|    |   |
|    |   |-home/
|    |   |   |
|    |   |   |-HomeAluno.styles.ts
|    |   |   |_HomeAluno.tsx
|    |   | 
|    |   |-meuTreino/
|    |   |   |
|    |   |   |-MeuTreino.styles.ts
|    |   |   |_Meutreino.tsx
|    |   |  
|    |   |_perfil/
|    |       |
|    |       |-PerfilAluno.styles.ts
|    |       |_PerfilAluno.tsx
|    |
|    |-cadastro/
|    |	   |
|    |	   |-index.tsx
|    |	   |_styles.ts
|    |
|    |-instrutor/
|    |     |
|    |     |-adicionarExercicio/
|    |     |       |
|    |     |       |-AdicionarExercicios.styles.ts
|    |     |       |_AdicionarExercicios.tsx
|    |     |
|    |     |-criarTreino/
|    |     |       |
|    |     |       |-CriarTreino.styles.ts
|    |     |       |_CriarTreino.tsx
|    |     |-home/
|    |     |   |
|    |     |   |-HomeInstrutor.styles.ts
|    |     |   |_HomeInstrutor.tsx
|    |     |
|    |     |-listaAlunos/
|    |     |   |
|    |     |   |-ListaAlunos.styles.ts
|    |     |   |_ListaAlunos.tsx
|    |     |
|    |     |_visualizarTreino
|    |         |VisualizarTreino.styles.ts
|    |         |_VisualiarTreino.tsx
|    |
|    |
|    |
|    |_login/
|	      |
|	      |-index.tsx
|	      |_styles.ts
|
|--routes/
|	      |
|	      |-bottom.Alunos.tsx
|	      |-bottom.Instrutores.tsx
|	      |_index.routes.tsx 
|
|
|--services/ 
|	|
|	|-auth.ts
|       |-exerciciosServices.ts
|	      |-profileServices.ts
|	      |-supabase.ts
|	      |_treinosServices.ts
|
|
|
|_types/
      	|
	      |_treino.ts

```

 Estrutura do Banco de Dados

 profiles

Responsável pelo armazenamento dos usuários.

Campos principais:

* id
* email
* role
* name

 treinos

Responsável pelo armazenamento dos treinos.

Campos principais:

* id
* nome
* objetivo
* dias_semana

 exercicios

Responsável pelo armazenamento dos exercícios.

Campos principais:

* id
* treino_id
* nome
* series
* repeticoes
* descansoSegundos
* series_concluidas
* is_finished



 Como Executar o Projeto

 PRIMEIRA VEZ (baixar o projeto)

Abrir o terminal (cmd ou git bash) e rodar:


```bash
cd C:\projetos
git clone https://github.com/LucasAlvesDev-art/FitTech 
cd FitTech
code .
```

Isso vai baixar o projeto e abrir no VS Code.

USO DIÁRIO (antes de começar a programar)

Sempre que for trabalhar no projeto:

``` bash
cd C:\projetos\FitTech
git checkout develop
git pull origin develop
```

 Instalar dependências

```bash
npm install
```

npm install instala automaticamente todas as dependências e bibliotecas necessárias para executar o projeto, 
com base nas informações definidas no arquivo package.json. 
Além disso, cria a pasta node_modules e configura o ambiente de desenvolvimento da aplicação.

 Iniciar aplicação
 
 ABRIR O PROJETO

Se ainda não estiver aberto:

```bash
code .
```

```bash
npx expo start
```

ou 

```bash
npx expo start -c
```

para limpar o cachê do app

Quando terminar de programar, vai precisar encerrar o expo, só pressionar 

```bash
CRTL + C
```

ENVIAR ALTERAÇÕES

Depois de programar:

```bash
git add .
git commit -m "feat: descrição da alteração"
git push origin nome-da-sua-branch
```

 Objetivo Acadêmico

Este projeto foi desenvolvido como atividade acadêmica com o objetivo de aplicar conceitos de:

* Desenvolvimento Mobile
* Banco de Dados
* Integração Frontend e Backend
* Experiência do Usuário (UX)
* Engenharia de Software
* Desenvolvimento Colaborativo

 Equipe

* Lucas Alves – Estrutura do sistema, autenticação, rotas e integração
* Luciano – Telas do aluno
* Gustavo Leandro – Telas do instrutor
* Bianca – Usuários e autenticação
* Nicolas – Banco de dados, treinos e exercícios
* Felipe – Integração frontend/backend
* Lucas Massari e Jurandir - Documentação geral do aplicativo/projeto

 Status do Projeto

Em desenvolvimento.
Versão funcional com autenticação, gerenciamento de treinos e acompanhamento de exercícios implementados. 
