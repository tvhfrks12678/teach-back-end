
// import { Console, Effect } from "effect/index";
import { Console, Effect } from "effect";
import { Elysia } from "elysia";
import { pipe, Array, Option, Stream } from "effect"
import { resolve } from "bun";
import { error } from "effect/Brand";
// const app = new Elysia().get("/", () => "Hello Elysia").listen(3000);

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

const isValidUser = (user: typeof users[number]) => user.name.trim().length > 0;
const firstValidName = pipe(
  users,
  Array.findFirst(isValidUser),
  Option.map((user) => user.name.trim())
)

// const parseName = (user: typeof users[number]): Option.Option<string> => {
//   const trimmed = user.name.trim();
//   return trimmed.length === 0 ? Option.none() : Option.some(trimmed);
// }

// const getName = (user: typeof users[number０ー]) : Option.Option<string> =>
//   user.name.trim() === "" ? Option.none<string>() : Option.some(user.name.trim());

// const firstValidName = pipe(
//   users,
//   Array.findFirst((u) => Option.isSome(getName(u))),
//   Option.flatMap(getName)
// );

// const firstValidName = pipe(
//   users,
//   Array.map(getName),
//   Array.findFirst(Option.isSome),
//   Option.flatMap((opt) => opt)
//   // Array.findFirst(getName)
// );


const program = Console.log(firstValidName);

// Effect.runSync(program)

const parseNmaeStream = (user: typeof users[number]) => {
  const trimmed = user.name.trim();
  return trimmed.length > 0 ? Option.some(trimmed) : Option.none();
};

const programStream = pipe(
  Stream.fromIterable(users),

  Stream.filterMap(parseNmaeStream),

  Stream.runHead
);


Effect.runPromise(programStream).then(console.log)


// Applicative
const fetchConfigEffect = Effect.promise(() => {
  return new Promise<string>(resolve => {
    setTimeout(() => resolve("Config: OK"), 500);
  });
}).pipe(
  Effect.mapError(() => "API ERROR")
);

const fetchAnalyticsEffect = Effect.promise(() => {
  console.log("-> Analytics API Start");
  return new Promise<number>(resolve => {
    setTimeout(() => resolve(42), 300);
  });
}).pipe(
  Effect.mapError(() => "Error")
);

const combinedEffects = Effect.all([
  fetchConfigEffect,
  fetchAnalyticsEffect,
]);

const run = combinedEffects.pipe(
  Effect.tap(([configResult, analyticsResult]) =>
    Console.log(`--- 結合結果 ----`)
      .pipe(Effect.flatMap(() => Console.log(`設定: ${configResult}, 分析: ${analyticsResult}`)))
  ),
  Effect.catchAll((error) => Console.error(`エラー発生: ${error}`)),
)

Effect.runPromise(run);

new Elysia()
  .get('/', 'Hello Elysia !!!')
  .get('/user/:id', ({ params: { id }}) => id)
  .post('/form', ({ body }) => body)
  .get('/first-user', () => {
    return Option.getOrElse(firstValidName, () => "No valid user found")
  })
  .listen(3000)

console.log("🦊 Server is running at http://localhost:3000");

