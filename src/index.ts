
// import { Console, Effect } from "effect/index";
import { Console, Effect } from "effect";
import { Elysia } from "elysia";
import { pipe, Array, Option } from "effect"
// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

new Elysia()
  .get('/', 'Hello Elysia !!!')
  .get('/user/:id', ({ params: { id }}) => id)
  .post('/form', ({ body }) => body)
  .listen(3000)

// console.log(
//   `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
// );

// const program = Console.log("Hello, World! effect-ts");

const users = [
  { id: 1, name: "Grok", age: 25, role: "admin" },
  { id: 2, name: "Alice", age: 17, role: "user" },
  { id: 3, name: "", age: 30, role: "moderator" },
  { id: 4, name: "Bob", age: 19, role: "user" },
  { id: 5, name: "Charlie", age: 16, role: "user" },
] as const;

// Option
const getName = (user: typeof users[number]) : Option.Option<string> =>
  user.name.trim() === "" ? Option.none<string>() : Option.some(user.name.trim());

const firstValidName = pipe(
  users,
  Array.findFirst((u) => Option.isSome(getName(u))),
  Option.flatMap(getName)
);

// const firstValidName = pipe(
//   users,
//   Array.map(getName),
//   Array.findFirst(Option.isSome),
//   Option.flatMap((opt) => opt)
//   // Array.findFirst(getName)
// );


const program = Console.log(firstValidName);

Effect.runSync(program)