# ANWAR
## Установка
Установка необходимых программ для запуска
- [Chocolate](https://chocolatey.org/install#individual) -  установка программ
- [Git](https://git-scm.com/download/win) - для обновление Anwar
- [node.js](https://nodejs.org/en/download/package-manager) - для того чтобы работал Anwar
## Порядок выполнения установки для Windows
### Подготовителный этап
Открой командную строку, копируй и вставляй по одному команду
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
```
winget install --id Git.Git -e --source winget
```
```
choco install nodejs-lts --version="20.15.0"
```
### Установка программы
Открой папку, куда будет установлена программа и выполняй команды ниже:
```
git clone https://github.com/edhit/anwar.git
```
```
cd ./anwar/programms & npm i
```
```
cd ./../web & npm i & cp .env.example .env & node make:migration run & npm run dev
```
<img align="right" width="40%" src="https://raw.githubusercontent.com/edhit/anwar/main/public/server.jpg">

В конце всех команд, должно появится такое окно.


Открой браузер и введи Server address, который указан в командной строке

### Обновление программы
Открой папку, где установлена программа и выполни команду ниже:
```
git pull
```
### Удаление программы
Просто удали папку, где находится программа
## Дополнительно
Для более удобного запуска программы, создай на рабочем столе файл с расширением \*.bat\* и вставь этот код 
```
cd "path" & npm run dev
```
path - укажи полный путь до папки anwar/web. Например:
```
cd C:\anwar\web & npm run dev
```
