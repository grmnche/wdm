[![Build Status](https://img.shields.io/badge/Build-Progress-yellow)](https://github.com/grmnche/middle.messenger.praktikum.yandex/tree/sprint_1)

## WebDragonMessenger (WDM)

**WDM** - простой в использовании мессенджер для неформального и делового общения. С его помощью можно всегда оставаться на связи с друзьями и коллегами, обмениваться текстовыми сообщениями, отправлять и получать файлы различных форматах.

## Прогресс

1. Разработка UI ✅
2. Этап перехода на TypeScript, приведения приложения к шаблону MVC, компонентного подхода, валидации форм ✅
3. Подключён роутинг, чаты, авторизация, WebSocket для работы с real-time сообщениями ✅
4. Добавлены тесты для роутера, компонента и модуля отправки запросов. Проведён аудит пакетов и их обновление. Настроен pre-commit ✅

## Установка

- `npm install` — установка,
- `npm run dev` — запуск версии для разработчика,
- `npm run start` — сборка и запуск билда,
- `npm run build` — сборка,
- `npm run eslint` — eslint,
- `npm run stylelint` — stylelint.

## **Описание кода**

Код **WDM** написан в стиле современной веб-разработки с использованием набора основополагающих практик и инструментов, в том числе KISS и DRY. Структура приложения построена на шаблонизации и компонентном подходе. Проект нацелен на удобство в использовании как для пользователей, так и для разработчиков.

Используется TypeScript, Eslint и Stylelint.

**Netlify**
[https://thriving-biscochitos-25136b.netlify.app/]

**Страницы**
[Ошибка400](src/pages/error/error400/error400.hbs)
[Ошибка500](src/pages/error/error500/error500.hbs)
[Вход](src/pages/login/login.hbs)
[Регистрация](src/pages/registration/registration.hbs)
[Изменение данных профиля](src/pages/profile/modules/settings/settings.hbs)
[Изменение пароля](src/pages/profile/modules/settings-password/settings-password.hbs)
[Профиль](src/pages/profile/profile.hbs)
[Чат](src/pages/messenger/messenger.hbs)

# wdm
