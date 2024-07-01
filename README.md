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
cd ./web & npm i & cp .env.example .env & node make:migration run & npm run dev
```
```
cd ./../programms & npm i
```
### Обновление программы
Открой папку, где установлена программа и выполни команду ниже:
```
git pull
```
### Удаление программы
Просто удали папку, где находится программа
