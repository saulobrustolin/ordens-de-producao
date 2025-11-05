# API de Ordens

API REST desenvolvida com **NestJS**, **Prisma** e **JWT**, focada no gerenciamento de ordens de produção e controle de etapas.  
Inclui sistema de autenticação, autorização por cargo (`USER` e `ADMIN`), documentação via Swagger e testes unitários.

## 🚀 Tecnologias

- **Node.js**
- **NestJS**
- **Prisma ORM**
- **PostgreSQL**
- **JWT (Json Web Token)**
- **Passport**
- **Class Validator**
- **Swagger**

## 📦 Estrutura do Projeto
```
src/
├─ auth/
│ ├─ dto/
│ ├─ auth.controller.ts
│ ├─ auth.service.ts
│ └─ jwt.strategy.ts
├─ users/
│ ├─ dto/
│ ├─ users.controller.ts
│ └─ users.service.ts
├─ orders/
│ ├─ dto/
│ ├─ orders.controller.ts
│ └─ orders.service.ts
├─ prisma/
│ └─ prisma.service.ts
├─ main.ts
└─ app.module.ts
```
## 🗄️ Banco de Dados (Prisma)

### `schema.prisma` (exemplo do projeto)

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  role      Role     @default(USER)
  createdAt DateTime @default(now())
  orders    Order[]
}

model Order {
  id          String      @id @default(uuid())
  code        String
  description String
  status      String
  createdBy   String
  user        User        @relation(fields: [createdBy], references: [id])
  steps       OrderStep[]
}

model OrderStep {
  id          String   @id @default(uuid())
  orderId     String
  name        String
  sequence    Int
  completedAt DateTime?
  order       Order     @relation(fields: [orderId], references: [id])
}

enum Role {
  USER
  ADMIN
}
```

## ⚙️ Configuração
1. Instale as dependências
```
npm install
```

2. Configure o ```.env```
Crie o arquivo na raiz do projeto:
```
DATABASE_URL="postgresql://user:password@localhost:5432/orders"
PORT=3000

JWT_SECRET="sua_chave_secreta_aqui"
```

3. Execute as migrações
```
npx prisma migrate dev
```

4. Rode o projeto
```
npm run start:dev
```
## 🔐 Autenticação
A API utiliza JWT com Bearer Token.

Obter Token
POST /auth/login


Payload:
```
{
  "email": "email@example.com",
  "password": "senha"
}


Resposta:

{
  "access_token": "jwt_token_aqui"
}
```

Enviar token nas rotas protegidas:
Authorization: Bearer <token>
## 👥 Controle de Acesso (Roles)
Usuários comuns → USER
Administradores → ADMIN

Exemplo de rota protegida para ADMIN:
```
@Roles('ADMIN')
@Get(':id')
detalhesUsuario() {}
```

## 📚 Documentação (Swagger)
Após iniciar o servidor:

http://localhost:3000/docs

## 📝 Endpoints Principais
### Autenticação
| Método | Rota | Descrição |
| ------ | ------ | ------ |
| POST | /auth/register | Registrar novo usuário |
| POST | /auth/login |	Autenticar usuário |

### Usuários
| Método | Rota | Descrição |
| ------ | ------ | ------ |
| GET |	/users/me |	Retorna dados do usuário autenticado |
| PATCH |	/users/me |	Atualiza dados do usuário |

### Ordens
| Método | Rota | Descrição |
| ------ | ------ | ------ |
| GET |	/orders |	Lista ordens |
| POST |	/orders |	Cria ordem |
| GET |	/orders/:id |	Detalhes da ordem |
| PATCH |	/orders/:id |	Atualiza ordem |
| DELETE |	/orders/:id |	Remove ordem |

### Etapas da Ordem
| Método | Rota | Descrição |
| ------ | ------ | ------ |
| POST |	/orders/:id/steps |	Adiciona etapa |
| PATCH |	/orders/:id/steps/:stepId |	Atualiza etapa |

## ✅ Testes
Execute essa linha no terminal do projeto:
```
npm run test
```

## 📷 Swagger UI
![Swagger UI](./docs/swagger.png)