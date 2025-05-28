# **WebDragon Messenger (WDM)**  
### **Платформа для обмена сообщениями с поддержкой реального времени**  

[![Netlify Status](https://api.netlify.com/api/v1/badges/5b2f3b7a-9b1a-4b8a-8b0a-5b2f3b7a9b1a/deploy-status)](https://thriving-biscochitos-25136b.netlify.app/)  
[![TypeScript](https://img.shields.io/badge/TypeScript-4.8+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)  

**Корпоративное решение** для обмена текстовыми сообщениями и файлами. Архитектура спроектирована для масштабируемости с соблюдением **SOLID-принципов** и возможностью перехода на **микросервисы**.  

---

## **🚀 Ключевые возможности**  
- **Обмен сообщениями в реальном времени** (WebSocket, EventBus)  
- **Модульный интерфейс** (Handlebars + компонентный подход)  
- **Типизованность** (TypeScript 4.8+)  
- **Оптимизированная производительность** (Vite, tree-shaking)  

---

## **🛠 Технологический стек**  
### **Фронтенд**  
- **Язык**: TypeScript  
- **Сборка**: Vite (Rollup)  
- **Шаблонизация**: Handlebars  
- **Стили**: SCSS + BEM  
- **Состояние**: Кастомное MVC-хранилище  

### **Бэкенд**  
- **Сервер**: Node.js + Express  
- **Реальное время**: WebSocket  
- **Тестирование**: Mocha/Chai  

### **DevOps**  
- **Деплой**: Netlify (CI/CD)  
- **Линтеры**: ESLint, Stylelint  
- **Pre-commit хуки**: Проверка кода перед коммитом  

---

## **🌐 Демо**  
**Рабочее демо**: [https://thriving-biscochitos-25136b.netlify.app/](https://thriving-biscochitos-25136b.netlify.app/)  

---

## **📜 Принципы разработки**  
1. **Чистая архитектура**: Разделение UI (компоненты), логики (контроллеры) и данных (модели).  
2. **Тестируемость**: Сервисы с DI для легкого мокирования.  
3. **Событийная модель**: Синхронизация WebSocket ↔ DOM через кастомный EventBus.  

---

## **📊 Почему этот проект выделяется**  
✅ **Продуманная архитектура**: Четкое разделение ответственности.  
✅ **Готовность к продакшену**: Оптимизированная загрузка.  
✅ **Расширяемость**: Поддержка будущих фич (голосовые сообщения, видеозвонки).  

---

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/grmnche/middle.messenger.praktikum.yandex)
