<h1 align="center"> Storage  </h1>

API Rest para gerenciamento de produtos
API Rest desenvolvida em NodeJs e AdonisJs para gerenciamento de produtos, utilizando o padrão MVC e o banco de dados MySQL, com o auxílio do Lucid para manipulações necessárias no banco de dados.

Tecnologias utilizadas
* NodeJs
* AdonisJs
* MySQL
* Lucid
* Angular2+

# :hammer: Funcionalidades do projeto
A API permite as seguintes funcionalidades:

`Funcionalidade 1` Consulta de produtos

`Funcionalidade 2` Criação de produtos

`Funcionalidade 3` Edição de produtos

`Funcionalidade 4` Exclusão de produtos

Ao clicar no botão "Adicionar", é realizada uma validação dos campos nome, preço e validade. Se todos os campos estiverem preenchidos, os valores são enviados para o backend. Ao receber a resposta do sucesso da inserção, a lista de produtos é atualizada.

Ao clicar no botão "Editar", é exibido um modal com os valores do produto selecionado. Ao clicar no botão "confirmar", os valores desse produto são atualizados, e o modal é fechado.

Ao clicar no botão "Excluir", é exibido um modal com um campo para o usuário digitar o nome do produto que deseja deletar. Ao clicar no botão "confirmar", o produto é deletado, e o modal é fechado.

A tabela de produtos é componentizada, possibilitando a entrada de valores para dentro do componente por meio de input properties. As ações "editar" e "excluir" disparam eventos de saída por meio do output properties para o componente pai.

### 🎲 Rodando o Back End (servidor)

Clone o repositório:
```
git clone https://github.com/seu-usuario/nome-do-repositorio.git
```
Instale as dependências do back:
```
npm install
```
Execute as migrations para manipular a estrutura no banco de dados (DDL):
```
node ace migration:run
```
Inicie o servidor:
```
node ace serve

```
### 🎲 Rodando o Front End (cliente)
```
npm install
```
caso falte pacotes e ocorra algum erro adicione os pacotes:

```
ng add @angular/material
```
e o pacote:

```
npm install moment --save
```

Inicie o servidor:

```
ng serve

``` 
Autor
Pedro Marinho.

Licença
[MIT](https://choosealicense.com/licenses/mit/)
