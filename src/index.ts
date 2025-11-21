
import { Console, Effect } from "effect/index";
import { Elysia } from "elysia";

// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

new Elysia()
  .get('/', 'Hello Elysia !!!')
  .get('/user/:id', ({ params: { id }}) => id)
  .post('/form', ({ body }) => body)
  .listen(3000)

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );

const program = Console.log("Hello, World! effect-ts");

Effect.runSync(program)