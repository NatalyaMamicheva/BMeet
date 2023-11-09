# BMeet

Командная разработка проекта по методологии Agile(SCRUM):

Web-сервис "BMeet"

Drawing board

Описание проблемы

Ниже описана проблема, которую имеем на входе:

Представьте, что в гибридном митинге принимают участие два непримиримых приверженца разных вайтбордов. Один консервативно настаивает, что нужно использовать физическую доску и транслировать её в митинг, а второй хочет использовать виртуальный вайтборд, чтобы на нём мог работать каждый. Очевидно, можно трансформировать реальный вайтборд в виртуальный единожды (пусть даже и в виде изображения) после того, как первый пользователь внесёт все необходимые правки, и работать уже с виртуальной доской. Однако, в таком случае первый пользователь уже не сможет отслеживать дальнейшие изменения на своем физическом вайтборде.

Цель проекта

Основной целью проекта является реализация web-сервиса для проведения совместных митингов команды на вайтборде.

Общие требования к разработке

Web-сервис включает в себя следующие основные части:

Аутентификацию / регистрацию
Главную страницу
Инструмент рисования:
Доску (холст) - общее пространство для рисования
Панель инструментов для рисования
Управление аккаунтом
Аутентификация / регистрация
Необходимо реализовать следующую схему:
Регистрация > верификация > аутентификации + восстановления доступа

Главная страница

Главная страница должна включать в себя:

Функционал создания, выбора и управления доской для митинга
Переход на меню управления аккаунтом

Требования к доске

Ниже описаны основные требования к доске:

Доска должна быть на всю ширину экрана
Доска должна быть белого или светло-серого цвета (т.е. нейтральной)
Возможность рисования на доске должны иметь одновременно все участники текущего митинга
Пользователи должны иметь возможность рисовать как на интерактивной физической доске, так и на любом удобном для них устройстве (ноутбуке, планшете и телефоне, т.е. должна быть адаптивной)

Требования к панели инструментов

Ниже описаны основные требования к панели инструментов:

Панель инструментов должна выглядеть в виде небольшого блока
Минимально необходимые инструменты: карандаш, ластик, фигуры
Предоставить возможность менять цвет карандаша или фигур

Управление аккаунтом

Меню управления аккаунтом включает в себя:

Переход в настройки профиля (поля: ФИ, username, почта + смена пароля + удалить аккаунт)
Выход из системы

Стек технологий:

Front
* HTML/SCSS
* React
* JavaScript
* Canvas


Back
* Python
* Django
* Django REST Framework 
* PostgreSQL
* Redis
* Celery
* Docker
* Docker Compose

Оформление дизайна осуществлялось с помощью Figma

Работа в команде проводилась в Jira и Miro

Проверка запросов осуществлялась в Postman


Установка и запуск

Backend

Клонируем репозиторий с Backend

https://github.com/revike/BMeet

Переходим в директорию проекта

cd BMeet

Frontend

Клонируем репозиторий с Frontend

https://github.com/NatalyaMamicheva/BMeet

Переименовываем клонированную директорию с фронтом BMeet на frontend

Переходим в директорию frontend

cd frontend

Переключаемся на ветку developer

git checkout developer

Переходим в директорию my-app

cd my-app

Создаем файл .env такой же, как .env.example (меняем настройки при необходимости)

touch .env

Во время разработки периодические обновляем ветку frontend


git pull

Возвращаемся в главную директорию проекта

cd ../..

Backend или запуск с помощью docker-compose

Создаем виртуальное окружение

python3 -m venv venv

Активируем виртуальное окружение

source venv/bin/activate

Создаем файл .env такой же, как .env.sample (меняем настройки при необходимости)

touch .env

Устанавливаем зависимости

pip install -r requirements.txt

Выполняем миграции

python backend/manage.py migrate

Запуск

python backend/manage.py runserver

Запуск с помощью docker-compose

docker-compose up -d --build

Запуск тестов (docker-compose должен быть запущен)

Тесты

docker-compose exec web python backend/manage.py test users

docker-compose exec web python backend/manage.py test cabinet

docker-compose exec web python backend/manage.py test board
