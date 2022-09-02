# Store-Manager
API RESTFULL utilizando arquitetura MSC(model – service – controller). A aplicação é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para a gestão dos dados.

Primeiros passo:
1- Clone o repositório
2- digite o comando npm install
3- crie um arquivo .env na raiz com os seguintes parâmetros:
  MYSQL_HOST=localhost
  MYSQL_USER='seu usuario do banco de dados
  MYSQL_PASSWORD='senha do seu banco'
  MYSQL_DATABASE=StoreManager
  PORT=3006
4- rode o comando npm run migration para criar as tabelas do banco
5- rode o comando npm run seed, para povoar as tabelas do banco
6- rode o comando npm run dev para iniciar o servidor
7- acesse http://localhost:3006/docs/ no navegador para visualizar a documentação


