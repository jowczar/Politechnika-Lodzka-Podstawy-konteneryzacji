# Politechnika-Lodzka-Podstawy-konteneryzacji

## Install requirements

`pip install -r requirements`

## Copy .env.example to .env file

`cp .env.example .env`

You should fill .env with own values

## Run dev server

`python manage.py runserver`

## Build docker image

`docker build -t yt-manager-backend .`

## Run docker container

`docker run --name YT_MANAGER_BACKEND -p 0.0.0.0:8080:8000 yt-manager-backend`
