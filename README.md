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

  cd ../frontend #entre na pasta frontend

  npm install # ou yarn
```

## 3. Executar projeto

- Executando Backend

```bash
  # Entre na pasta do projeto
  # Deve ter permissão root/de adminitrador

  cd backend/ # entrar na pasta do backend

  docker-compose up -d # irá inciar o contêiner do MYSQL na porta 3308

  npm start # ou yarn start
```

- Executando Frontend

```bash
  # Entre na pasta do projeto

  cd frontend/ # entrar na pasta do frontend

  npm start # ou yarn start
```
