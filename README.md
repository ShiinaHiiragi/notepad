# Notepad

<p align="right">
  Author: Ichinoe <br/>
  Version: 0.0.1
</p>

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

   - If you want to change the target platform (Linux, for example), please change it at `package.json`: `--platform=linux`

## 3 Using

1. The shortcut <kbd>Ctrl</kbd> + <kbd>H</kbd> can hide the menu, which means that most of the shortcut are disabled (such as <kbd>Ctrl</kbd> + <kbd>S</kbd> to save). To toggle **REAL** full screen, press <kbd>F11</kbd> and then  <kbd>Ctrl</kbd> + <kbd>H</kbd> ; to cancel it, press  <kbd>Ctrl</kbd> + <kbd>H</kbd> and then  <kbd>F11</kbd>.

2. In order to response to sudden crash, the notepad will autosave the `Unsaved` file in the back up zone (`./backup`) every 30 seconds. The program will **NOT** clear the backup area when it's too large (in case user may forget to drag out the important file which is not saved). 

   - The file name is the md5 of the saving time.

   - Press  <kbd>Ctrl</kbd> + <kbd>B</kbd> or menu `Sytem - Open Backup Directory` to open backup directory. 
   - Click menu `Sytem - Detect Size of Backup` to view the size of files stored in the backup area, and click `Sytem - Clear Backup` to delete all files in the backup. Attention, the directories in the `./backup` will not be detected or deleted.

3. The <kbd>tab</kbd> used in the text editor will be automatically changed into a SBC space (Unicode+12288).

## 4 Development Information

1. License: MIT

2. Dependencies

   ```
   Node.js: 14.15.4
   Electron: 11.2.0
   Semantic-UI: 2.4.2
   Chromium: 87.0.4280.88
   jQuery: 3.5.1
   ```
   
3. Existing bugs:

   - [ ] Pressing  <kbd>tab</kbd> out of the notepad will trigger error of node.
   - [ ] Trying to make <kbd>Ctrl</kbd> + <kbd>S</kbd> a global shortcut.

<p align="right"> 2021 01/21 </p>
