# AutoFlex - projeto React & Typescript 
Projeto full stack, utilizando React e Typescript no frontend, Java com o framework Spring Boot para construção da API e PostgreSQL para armazenamento dos dados. Alguns frameworks como JPA também foram utilizados. O problema e os requisitos seguidos se encontram a seguir.

# Descrição do problema:

Uma indústria que produz produtos diversos, necessita controlar o estoque dos insumos (matérias-primas) necessárias para a produção dos itens que fabrica. Para isso será necessário o desenvolvimento de um sistema que permita manter o controle dos produtos e das matérias-primas que são utilizadas para a produção de cada produto.

Para o produto devem ser armazenados, além do código, o nome e o valor.

Para as matérias-primas, além do código, também devem armazenados o nome e quantidade em estoque. Obviamente, deverá ser feito a associação dos produtos e das matérias primas que o compõem, com as respectivas quantidades necessárias de cada matéria prima para produzir o produto.

Além da manutenção dos cadastros, deseja-se saber quais produtos (e quais quantidades) podem ser produzidos com as matérias-primas em estoque, e o valor total que será obtido com a produção sugerida pelo sistema.

A priorização de quais produtos devem ser sugeridos pelo sistema, deve ser pelos produtos de maior valor, uma vez que uma determinada matéria-prima pode ser utilizada em mais de um produto.

Requisitos:

- Requisitos não funcionais

-- RNF001 – O sistema deverá ser desenvolvido para a plataforma WEB, sendo possível a execução nos principais navegadores (Chrome, Firefox, Edge).

-- RNF002 – O sistema deverá ser construído utilizando o conceito de API, ou seja, separar o back-end do front-end.

-- RNF003 – As telas desenvolvidas no front-end devem utilizar os recursos de responsividade.

-- RNF004 – A persistência de dados deve ser realizada em Sistema Gerenciador de Banco de Dados, com a possibilidade de utilizar Postgres, MySql ou Oracle. Caso tenha instalado o Oracle, a sugestão é utilizá-lo.

-- RNF005 – O back-end (API) deve ser desenvolvido utilizando algum framework, como Spring, Quarkus ou similar. Caso você conheça Quarkus, a sugestão é que aplique já que é uma das tecnologias utilizadas no Autoflex.

-- RNF006 – O front-end pode ser desenvolvido utilizando qualquer linguagem ou framework que possibilite o atendimento dos requisitos. Caso você conheça React e Redux, a sugestão é que aplique já que são tecnologias utilizadas no Autoflex.

-- RNF007 – Tanto a codificação do back-end, front-end, tabelas e colunas do banco de dados devem ser desenvolvidas utilizando a língua inglesa.

- Requisitos funcionais

-- RF001 – Desenvolver no back-end as funcionalidades CRUD para manter o cadastro de produtos.

-- RF002 – Desenvolver no back-end as funcionalidades CRUD para manter o cadastro de matérias primas.

-- RF003 – Desenvolver no back-end as funcionalidades CRUD para associar matérias-primas aos produtos.

-- RF004 – Desenvolver no back-end as funcionalidades para a consulta dos produtos que podem ser produzidos com as matérias-primas disponíveis em estoque.

-- RF005 – Desenvolver no front-end uma interface gráfica que possibilite realizar as operações CRUD para manter o cadastro de produtos.

-- RF006 – Desenvolver no front-end uma interface gráfica que possibilite realizar as operações CRUD para manter o cadastro de matérias primas.

-- RF007 – Desenvolver no front-end uma interface gráfica que possibilite realizar as operações CRUD para associar matérias-primas aos produtos. Não há a necessidade de ser uma tela separada, podendo ser inserida a interface no cadastro de produtos.

-- RF008 – Desenvolver no front-end uma interface gráfica que possibilite listar quais produtos (e quais quantidades) podem ser produzidos com as matérias-primas disponíveis em estoque.

# Antes de iniciar a aplicação (backend)
- é necessário configurar as applications properties, arquivo que contém as credenciais para o banco de dados. Um exemplo está contido na pasta backend/target/classes/com/application.properties
