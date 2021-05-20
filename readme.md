# :link: Valsugana API


### :book: Descrição 
#####  O presente projeto foi desenvolvido na aula de soluções web I com o professor [Lucas Ferreira](https://github.com/lucasferreira). O objetivo é a necessidade de um grupo de dança sem fins lucrativos. 
#####  A ideia inicial é que o administrador do sistema consiga realizar cadastros de dançarinos, ensaios e realizar chamadas.

### :computer: Tecnologias utilizadas 
![Badge](https://img.shields.io/badge/JavaScript-NodeJS-%F7DF1E?style=for-the-badge&logo=JavaScript)
![Badge](https://img.shields.io/badge/PostgreSql--%336791?style=for-the-badge&logo=PostgreSQL)
![Badge](https://img.shields.io/badge/Heroku-%237159c1?style=for-the-badge&logo=Heroku)


### :triangular_flag_on_post: Features
- [x] <strong>Cadastro de pessoa física</strong>  
- [x] <strong>Cadastro de dançarino</strong>  
- [x] <strong>Cadastro de ensaios</strong>  
- [x] <strong>Cadastro de chamadas</strong> 
- [ ] <strong>Cadastro de usuários</strong>  
- [ ] <strong>Autenticação</strong> 

### :grey_question: Requisitos para rodar o projeto
* ##### [NodeJs](https://nodejs.org/en/)
* ##### [PostgreSQL](https://www.postgresql.org/download/)


### :question: Como rodar o projeto na sua máquina
* ##### Na raiz do projeto, rode o comando ```npm install``` para baixar todas as dependências necessárias;
* ##### Você pode alterar as configurações de conexão com o banco de dados em: ``` src/config/database/config.js```;
* ##### Após ter configurado a conexão com o banco de dados, rode o comando: ```npm run migration-dev```. Esse comando irá rodar as migrations e criará as tabelas necessárias para o funcionamento da API;
* ##### Você pode iniciar a API com ```npm run dev``` ou ```npm run dev-d```. O primeiro iniciará o projeto sem debugger, já o segundo comando iniciará o projeto com debugger utilizando a ferramenta [ndb](https://www.npmjs.com/package/ndb);




### :file_folder: Status do projeto
- [x] <strong>MVP</strong>   




