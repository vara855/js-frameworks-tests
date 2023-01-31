# Тестируем различные фронтенд фреймворки

На примере клиентских приложений без SSR.

## Frameworks

* [Solid](./solid-tests) - Solid.js ✅
* [React](./react-tests) - React 18+ ✅
* [Vue](./vue-tests) - Vue3 ✅
* [Svelte](./svelte-tests) - Only Svelte without svelte kit.
* [Angular](./angular-tests) - Angular 14 (Standalone components).
* ...

## На что вообще смотрим?

* Шаблон, как легко стартануть? (npm create ...)
* Typescript support
* Как хранить состояние
* Рендеринг списков, перформанс проблемы?
* Unit Tests. Какие библиотеки и фреймворки.
* Documentation.
* Reactivity.
* Data fetching (handle loading & error state, refetch when smth changed or by request, caching for many components).
* Фреймворкнутость* - введение новых понятий, специальных registry, плагинов и тд и тп.
* Пробрасывание пропсов (spread operator, naming props, JS code in props.);

> ИМХО по фреймворкнутости*:
> Создание фронтенд приложения должно быть простым. Это место, где не должно быть оверинжиниринга.
> Мы пишем код, который превратится в JS. Все эти zone.js, плагины и способы сделать что-то сложнее чем простой JS - это путь в никуда.
> Фреймворк или библиотека должна дополнять способы взаимодействия с рендерингом нашего клиента (Lifecycle, reactivity, ...)

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
  4.5/5 (mergeProps()?, destructuring props..., )
* Как хранить состояние
  * Store 5/5
  * Signals 5/5
  * Context 5/5
* Control flow
  * 5/5
* Unit Tests. Какие библиотеки и фреймворки.
  * testing-library 4/5;
* Documentation.
  3/5
* Infra
  * Dev tools 4/5
  * ...
* Reactivity
  * Auto handling of dependencies
  * Customizing effect dependencies
  5/5
* Data fetching
  * Request state (5)
  * Caching (5)
  * Error Handling (5)
  * Refetch (5)
  5/5
* Фреймворкнутость 5/5
  * Темплеитирование
  * Реактивность
  * Скрытое пробрасывание пропсов - Контексты.
  * Lifecycle
  * Improved Flow Components (For,Show ....)
  * Custom attributes/directives

#### Overall

**4.8**

### React.js

* Шаблон, как легко стартануть? (npm create ...)
  5/5
* Typescript support
  5/5
* Props
  5/5
* Как хранить состояние
  * useState 3/5
  * Context 5/5
* Control flow
  * 4/5
* Unit Tests. Какие библиотеки и фреймворки.
  * testing-library 5/5;
* Documentation.
  5/5
* Infra
  * Dev tools 5/5
  * ...
* Reactivity
  3/5
* Data fetching
  * Request state (3)
  * Caching (1)
  * Error Handling (0)
  * Refetch (4)
  3/5
* Фреймворкнутость 5/5
  * Темплеитирование
  * Реактивность-- (но неудобная)
  * Скрытое пробрасывание пропсов - Контексты.
  * Lifecycle (через хуки)

#### Overall

**4.0**

### Vue.js

* Шаблон, как легко стартануть? (npm create ...)
  5/5
* Typescript support
  4.9/5

# @input="(e) => (userName = e.target?.value)" will throw ts error

* Props
  4.5/5 - (Есть два способа работы с пропсами. В целом удобно, но можно было сделать и лучше.)
* Template language
  * 4.7
* Как хранить состояние
  * ref() 5/5
  * DI 5/5
  * Store ?
* Control flow
  * 4/5 - Кастомные директивы.
* Unit Tests. Какие библиотеки и фреймворки.
  * testing-library 5/5;
* Documentation.
  5/5
* Infra
  * Dev tools 4.8/5
  * ...
* Reactivity
  5/5
* Data fetching
  * Request state (3)
  * Caching (1)
  * Error Handling (0)
  * Refetch (4)
  4.8/5
* Фреймворкнутость
  * Темплеитирование
  * Реактивность
  * Custom attributes/directives
  * Скрытое пробрасывание пропсов - DI. (но очень красивый).
  * Lifecycle
  * Registry
  * mics
  * `use`
  * plugins

#### Overall

**4.7**

### Svelte

* Props
  5/5 - Именованные пропсы. Понятно как их типизировать и устанавливать.
* Template language
  * 4.7 - Смесь vue + jsx. Явно передаёшь лямбду или ссылку на функцию.
* Как хранить состояние
  * REACTIVITY EVERYWHERE 3/5
  * STORE ?
  * script `type="module"` 5/5
* Control flow
  * 4.5/5 - Кастомные директивы.
* Unit Tests. Какие библиотеки и фреймворки.
  * testing-library ?;
* Documentation.
  4.3/5 - Сразу заставляет юзать svelte.kit, Dark Theme, CMD+K not working.
* Infra
  * Dev tools 4/5
  * Performance Utils ??
* Reactivity
  3.5/5
* Data fetching
  * Request state (3)
  * Caching (1)
  * Error Handling (0)
  * Refetch (4)
  4.5/5
* Фреймворкнутость
  * Темплеитирование +
  * Реактивность +
  * Скрытое пробрасывание пропсов - DI. (но очень красивый). +
  * Lifecycle +
* SSR as default 0/5

#### Overall

**4.4**

#### Todos

* [x] Разобраться почему деструктуризация пропсов в провайдере не работает. (Solid.js) <https://www.solidjs.com/guides/faq#why-do-i-lose-reactivity-when-i-destructure-props>
* [ ] Тесты не работаю  при последующем запуске в Solid.js. (cleanup() не работает...).
* [ ] Как управлять реактивностью в SVELTE?
