# GroceryDev

Este é um sistema de comércio com CRUD de produtos e compras

## 1. Tecnologias

- Front-end:
  - ReactJS
  - Typescript
- Back-end:
  - NodeJS
  - Typescript
  - TypeORM
  - Docker
- Database:
  - MySQL

## 2. Instalar:

- Primeiro certifique-se que seu computador possui Git, NodeJS, Docker, Docker-Compose

```bash
  git clone https://github.com/IanMarcony/GroceryDev.git

  cd GroceryDev/backend # entre na pasta backend

  npm install # ou  yarn

  docker-compose up -d # para iniciar o MySQL

  npm run typeorm migration:run # para executar as migrations

  cd ../frontend #entre na pasta frontend

  npm install # ou yarn
```

## 3. Executar projeto

- Executando Backend

```bash
  # Entre na pasta do projeto
  # Deve ter permissão root/de adminitrador

  cd backend/ # entrar na pasta do backend

  docker-compose up -d # irá inciar o contêiner do MYSQL na porta 3309

  npm start # ou yarn start
```

- Executando Frontend

```bash
  # Entre na pasta do projeto

  cd frontend/ # entrar na pasta do frontend

  npm start # ou yarn start
```
