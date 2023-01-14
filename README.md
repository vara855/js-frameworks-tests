# Тестируем различные фронтенд фреймворки

На примере клиентских приложений без SSR.

## Frameworks

* [Solid](./solid-tests) - Solid.js
* [React](./react-tests) - React 18+
* [Vue](./vue-tests) - Vue3
* [Angular](./angular-tests) - Angular 14 (Standalone components).
* Svelte - Only Svelte without svelte kit.
* ...

## На что вообще смотрим?

* Шаблон, как легко стартануть? (npm create ...)
* Typescript support
* Как хранить состояние
* Рендеринг списков, перформанс проблемы?
* Unit Tests. Какие библиотеки и фреймворки.
* Documentation.

### Что делаем?

Простой чат на вебсокетах. Логин, отправка сообщений.

#### Features

* Авто скрол сообщений
* Логин на уровне куков
  * ~~Роутинг?~~
* Отправка сообщений
* Рендеринг эмодзи.

---

## Results

### Solid.js

* Шаблон, как легко стартануть? (npm create ...)
  5/5
* Typescript support
  5/5
* Props
  3.5/5 (mergeProps()?, destructuring props..., )
* Как хранить состояние
  * Signals 5/5
  * Context 4.5/5
* Control flow
  * 4.5/5
* Unit Tests. Какие библиотеки и фреймворки.
  * testing-library 4/5;
* Documentation.
  3/5
* Infra
  * Dev tools 4/5
  * ...

#### Overall

**4**

### React.js

#### Pitfals

```js
const [state] = useState();
```

#### Todos

* Разобраться почему деструктуризация пропсов в провайдере не работает.
