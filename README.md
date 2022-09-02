# Store-Manager
API RESTFULL utilizando arquitetura MSC(model – service – controller). A aplicação é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. Foi utilizado o banco de dados MySQL para a gestão dos dados.

Primeiros passo:
<ol>
  <li>Clone o repositório</li>
  <li>digite o comando npm install</li>
  <li>crie um arquivo .env na raiz com os seguintes parâmetros:</li>
    <ul>
      <li>MYSQL_HOST=localhost</li>
      <li>MYSQL_USER='seu usuario do banco de dados</li>
      <li>MYSQL_PASSWORD='senha do seu banco'</li>
      <li>MYSQL_DATABASE=StoreManager</li>
      <li>PORT=3006</li>
    </ul>
  <li>rode o comando npm run migration para criar as tabelas do banco</li>
  <li>rode o comando npm run seed, para povoar as tabelas do banco</li>
  <li>rode o comando npm run dev para iniciar o servidor</li>
  <li>acesse http://localhost:3006/docs/ no navegador para visualizar a documentação</li>
</ol>
<div align="center">
  <img src="https://user-images.githubusercontent.com/88631168/188172629-7fb26682-3c16-4511-b53c-784522125712.png" width="700px" />
</div>


