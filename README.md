# Spelling Backend

Bem-vindo ao **Spelling Bee**! Este projeto é um servidor backend desenvolvido com **Node.js, TypeScript, Prisma e PostgreSQL**. Ele segue uma arquitetura em camadas.

## 📌 **Pré-requisitos**

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 20)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- [Prisma CLI](https://www.prisma.io/docs/getting-started/quickstart) (opcional, caso queira rodar comandos localmente)

## 🚀 **Rodando o Projeto**

### **2️⃣ Configurar as variáveis de ambiente**

Crie um arquivo **.env** na raiz do projeto e defina as seguintes variáveis:

```sh
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=mydb
DATABASE_URL="postgresql://postgres:postgres@db:5432/mydb"
```

### **3️⃣ Rodar os containers Docker**

```sh
  docker compose up -d
```

Isso iniciará:

- **PostgreSQL** (`db`)
- **Serviço de migração do Prisma** (`migrations`)
- **Backend** (`app`)
- **Adminer** (interface web para gerenciar o banco) acessível em [`http://localhost:8080`](http://localhost:8080)

Caso queira visualizar os dados, utilize:

```sh
  npx prisma studio
```

Ou acesse o **Adminer** pelo navegador:
🔗 [http://localhost:8080](http://localhost:8080)


### 🏗️ Construção e execução

Caso queira rodar sem Docker:

```sh
npm install          # Instala dependências
npm run dev          # Inicia o servidor em modo desenvolvimento
npm run build        # Compila para JavaScript
npm start           # Executa o build gerado
```

## 🛠 **Fluxo para Adicionar Novas Funcionalidades ao Prisma**

Caso precise modificar a estrutura do banco de dados (como adicionar uma nova tabela ou campo), siga este fluxo:

1️⃣ **Modifique** o arquivo `prisma/schema.prisma` adicionando os novos campos/modelos.

2️⃣ **Gere uma nova migração**:

```sh
npx prisma migrate dev --name minha_migracao
```

> 📌 **Dica:** Use um nome descritivo para a migração, como `add_category_table`.

Esse comando:
Verifica mudanças no schema.prisma.
Cria uma nova migração na pasta prisma/migrations/.
Aplica a migração no banco de dados imediatamente.
Gera automaticamente o Prisma Client.

**Verifique as mudanças**:

```sh
npx prisma studio
```

Ou acesse via **Adminer** em `http://localhost:8080`

---

### 🎨 Padronização de código

#### Verificar código com ESLint:

```sh
npm run lint
```

#### Corrigir problemas automaticamente:

```sh
npm run lint:fix
```

#### Formatar código com Prettier:

```sh
npm run format
```

> **Husky e lint-staged** também garantem a verificação automática no `pre-commit`.

---

## 📄 **Estrutura do Projeto**

```
📦 spelling-backend
├── 📂 prisma               # Esquema do Prisma
│   ├── schema.prisma       # Definição do banco de dados
│   ├── migrations/         # Migrações geradas pelo Prisma
├── 📂 src
│   ├── 📂 controllers      # Controladores (lógica das rotas)
│   ├── 📂 services         # Serviços (regras de negócio)
│   ├── 📂 repositories     # Repositórios (acesso ao banco)
│   ├── 📂 routes           # Definição das rotas Express
│   ├── index.ts            # Arquivo principal do servidor
├── 📦 dist                 # Código compilado pelo TypeScript
├── .env                    # Variáveis de ambiente
├── docker-compose.yml       # Configuração do Docker Compose
├── Dockerfile               # Configuração do container
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração do TypeScript
└── README.md                # Documentação do projeto
```

---

## 📮 **Endpoints da API**

| Método | Rota               | Descrição                    |
| ------ | ------------------ | ---------------------------- |
| `POST` | `/api/restaurants` | Criar um novo restaurante    |
| `GET`  | `/api/restaurants` | Listar todos os restaurantes |

Exemplo de **JSON para criar um restaurante**:

```json
{
  "name": "Pizza Express",
  "address": "Rua das Pizzas, 123"
}
```

## 🛠 Tecnologias Utilizadas

- **Node.js**: [Documentação](https://nodejs.org/)
- **TypeScript**: [Documentação](https://www.typescriptlang.org/)
- **Prisma**: [Documentação](https://www.prisma.io/)
- **PostgreSQL**: [Documentação](https://www.postgresql.org/)
- **Docker**: [Documentação](https://www.docker.com/)
