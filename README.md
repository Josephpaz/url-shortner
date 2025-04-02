# 🔗 url-shortner

Sistema backend desenvolvido com NestJS que permite o encurtamento de URLs, redirecionamento via código curto e rastreamento de acessos. Foi criado e estruturado com foco em boas práticas, arquitetura limpa e uso de tecnologias modernas como Drizzle ORM e Docker.

---

## 🧱 Diagrama do Banco de Dados

O sistema é composto por três entidades: `User`, `Url` e `AccessLogs`. A imagem abaixo representa o relacionamento entre elas.

![Diagrama ER](https://i.imgur.com/O1j0TNE)
https://dbdiagram.io/d/URL_SHORTNER-67e456974f7afba18457a27a

---

## ⚙️ Tecnologias utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [MySQL](https://www.mysql.com/)
- [Docker + Docker Compose](https://www.docker.com/)
- [Swagger (OpenAPI)](https://swagger.io/)
- [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Como rodar o projeto localmente

### ✅ Requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

---

### 📦 Passo a passo

1. **Clone o repositório**

```bash
git clone https://github.com/Josephpaz/url-shortner.git
cd url-shortner
```

2. **Copie o arquivo .env de exemplo**
```bash
cp .env.example .env
DATABASE_URL=mysql://root:secret@localhost:3306/url-shortner-db
```

3. **Suba o banco de dados com Docker**
```bash
docker compose up -d
```
4. **Rode as migrations no banco de dados**
```bash
npx drizzle-kit push
```
5. **Carregando as dependências**
```bash
npm i
```
6. **Inicie o servidor local**
```bash
npm run start:dev
```