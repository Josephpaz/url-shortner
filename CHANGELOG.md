# Changelog

## [v0.2.0] - 2025-03-30

### Adicionado

- **Autenticação com JWT:** Configuração de autenticação utilizando `@nestjs/jwt` e `passport-jwt`
- **Guarda opcional `OptionalJwtAuthGuard`:** Permite rotas públicas com suporte a token JWT quando disponível
- **Associação opcional de usuário ao link encurtado:** A rota `POST /urls` associa o `userId` à URL encurtada caso o usuário esteja autenticado
- **Token JWT carregado do header Authorization (Bearer token)**
- **Validação de token e extração do usuário via `JwtStrategy`**
- **Estrutura inicial para módulo de autenticação (`AuthModule`)**

## [v0.1.0] - 2025-03-30

### Adicionado

- **Rota pública `POST /urls`** para encurtar uma URL original
- **Validação de entrada** com `class-validator` e `@IsUrl()` no DTO de criação
- **Geração de short codes** com 6 caracteres aleatórios
- **Armazenamento no banco de dados** via `UrlRepoService`
- **Mapper de entidade `Url`**, com `toDomain` (Drizzle ➝ Domain) e `toDto` (Domain ➝ DTO)
- **Serviço `UrlService`** para coordenar criação e persistência da URL
- **Rota pública `GET /:short`** que redireciona o usuário para a URL original
- **Tratamento de exceção `NotFoundException`** caso o short code não seja encontrado
- **Documentação com Swagger** das rotas de encurtamento

---

## [v0.0.1] - 2025-03-27

### Adicionado

- **Configuração do Drizzle ORM:** Implementação inicial do Drizzle ORM para integração com o banco de dados MySQL.
- **Definição dos Schemas:** Criação dos schemas para as tabelas `user`, `url` e `accessLog` com suas respectivas colunas e chaves estrangeiras.
- **Configuração do Docker Compose:** Adição de um `docker-compose.yml` para facilitar a configuração local e execução dos serviços necessários.
- **Scripts de Migração:** Inclusão de scripts de migração para criar as tabelas no banco de dados conforme os schemas definidos.
