
# Teste de Lógica - WAAC

Um projeto fullstack para calcular soma de matrizes bidimensionais pelo maior de cada linha, sendo vizinho da útlima posição.

## Stack utilizada

**Language** TypeScript

**Front-end:** Zustand, TailwindCSS, Shadcn-ui, Sonner

**Back-end:**  Clerk, Prisma

**Full-stack** NextJS 14

## Screenshots

![App Screenshot]()


## Clone o projeto

```bash
  git clone https://github.com/Flaviogameover/teste-beawesome.git
```

Entre no diretório do projeto

```bash
  cd teste-beawesome
```

Instale as dependências

```bash
  npm install
```

Inicie a aplicação

```bash
  npm run dev
```

## Variáveis de Ambiente

Para prosseguir com a aplicação, você precisa adicionar as seguintes chaves no .env

key para conexão com o banco de dados MongoDB. Ex: 
**mongodb+srv://xxxx:xxxx%@%xxx.xxxx.mongodb.net/main**

```
DATABASE_URL=<KEY>
```

`Key publica do Clerk`

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<KEY>
```

`Key secreta do Clerk`

```
CLERK_SECRET_KEY=<KEY>
```
```
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
```
```
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
```
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
```
## Teste

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```


## Autores

- [@Flaviogameover](https://www.github.com/flaviogameover)

## Licença

[MIT](https://choosealicense.com/licenses/mit/)


