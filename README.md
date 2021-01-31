# Notepad--

## 1 Introduction

- This is a practicing project using Electron to achieve a simple notepad under the demands from one of author's friends.
- The notepad mainly support words statistics and full screen for more focused plain text writing experience.

## 2 Install

1. It's recommend to install `nvm` in advanced and ensure that you have install at least two version of `npm` (one before `10.12.0` and one after it).

   ```shell
   > nvm install 10.11.0  # before 10.12.0
   > nvm install 14.15.0  # later than 10.12.0
   > nvm list
   ```

2. Clone this repository and install dependencies.

   - Since the project require Semantic UI, it's a must to use `npm` whose version is not later than `10.11.0`.
   - The `npm start` can also be changed as `electron .`.

   ```shell
   > git clone https://github.com/ShiinaHiiragi/Notepad--
   > cd Notepad--
   > nvm use 10.11.0
   > npm install
   > npm start
   ```

3. If you want to package the project, please ensure to have installed the `electron-packager`.

   ```shell
   > nvm use 14.15.0
   > npm run package
   ```

   - If you want to change the target platform (Linux, for example), please change it at `package.json`: `--platform=linux"`

## 3 Using

NULL