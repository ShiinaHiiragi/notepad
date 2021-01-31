const fs = require('fs');
const BrowserWindow = require('electron').BrowserWindow;
const globalShortcut = require('electron').globalShortcut;
const dialog = require('electron').dialog;
const Menu  = require('electron').Menu;
const app = require('electron').app;

const template =
[
  {
    label: "File",
    submenu:
    [
      {
        label: "New File",
        accelerator: "Ctrl+N",
        click: () => { BrowserWindow.getFocusedWindow().webContents.send("newFile"); }
      },
      {
        label: "Open File",
        accelerator: "Ctrl+O",
        click: () => { BrowserWindow.getFocusedWindow().webContents.send("openFile"); }
      },
      { type: "separator" },
      {
        label: "Save File",
        accelerator: "Ctrl+S",
        click: () => { BrowserWindow.getFocusedWindow().webContents.send("saveFile"); }
      },
      {
        label: "Save As",
        accelerator: "Ctrl+Shift+S",
        click: () => { BrowserWindow.getFocusedWindow().webContents.send("saveFileAs"); }
      },
      { type: "separator" },
      {
        label: "Exit",
        accelerator: "Shift+Esc",
        role: "quit"
      }
    ]
  },
  {
    label: "Edit",
    submenu:
    [
      {
        label: "Undo",
        role: "undo"
      },
      {
        label: "Redo",
        role: "redo"
      },
      { type: "separator" },
      {
        label: "Cut",
        role: "cut"
      },
      {
        label: "Copy",
        role: "copy"
      },
      {
        label: "Paste",
        role: "paste"
      },
      {
        label: "Select All",
        role: "selectAll"
      }
    ]
  },
  {
    label: "Window",
    submenu:
    [
      {
        label: "Toggle Fullscreen",
        role: "toggleFullScreen"
      },
      {
        label: "Hide Menu",
        accelerator: "Ctrl+H",
        click: () => { Menu.setApplicationMenu(null); noMenu = true; }
      },
      { type: "separator" },
      {
        label: "Minimize",
        role: "minimize"
      },
      {
        label: "Maximize",
        accelerator: "Ctrl+Shift+M",
        click: () => { win.maximize(); }
      },
      { type: "separator" },
      {
        label: "Zoom In",
        accelerator: "Ctrl+=",
        role: "zoomIn"
      },
      {
        label: "Zoom Out",
        role: "zoomOut",
      },
      {
        label: "Reset Zoom",
        role: "resetZoom"
      }
    ]
  },
  {
    label: "System",
    submenu:
    [
      {
        label: "Open Console",
        role: "toggleDevTools"
      },
      {
        label: "Open Backup Directory",
        accelerator: "Ctrl+B",
        click: () =>
        {
          if (!fs.existsSync("./backup")) fs.mkdirSync("./backup");
          require('child_process').exec('start "" ".\\backup"');
        }
      },
      {
        label: "Clear Backup",
        click: () => { delDir("./backup"); }
      },
      {
        label: "Detect Size of Backup",
        click: () => { detectDir("./backup"); }
      },
      { type: "separator" },
      {
        label: "About",
        click: () => { BrowserWindow.getFocusedWindow().webContents.send("about"); }
      }
    ]
  }
];

function createWindow()
{
  win = new BrowserWindow({show: false,
    webPreferences: {nodeIntegration: true, enableRemoteModule: true}});
  win.maximize();
  win.show();
  win.loadFile('index.html');
  Menu.setApplicationMenu(menu);
  //win.on('closed', () => { win = null; });
  win.on('close', e =>
  {
    e.preventDefault();
    e.preventDefault();
    BrowserWindow.getFocusedWindow().webContents.send("toClose");
  });
}

function delDir(path)
{
  let files = [];
  var res = 0;
  if (fs.existsSync(path))
  {
    files = fs.readdirSync(path);
    files.forEach((file) =>
    {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isFile())
      {
        fs.unlinkSync(curPath);
        res += 1;
      }
    });
  }
  else fs.mkdirSync("./backup");
  var options = {title: "Delete Successfully", type: "info"};
  options.buttons = ["OK"];
  if (!files.length) options.message = "There is no file in backup area.";
  else options.message = "Delete " + String(res) + " files in total sucessfully.";
  dialog.showMessageBoxSync(options);
}

function detectDir(path)
{
  let files = [];
  var res = 0;
  var num = 0;
  if (fs.existsSync(path))
  {
    files = fs.readdirSync(path);
    files.forEach((file) =>
    {
      let curPath = path + "/" + file;
      if (fs.statSync(curPath).isFile())
      {
        res += fs.statSync(curPath).size;
        num += 1;
      }
    });
  }
  else fs.mkdirSync("./backup");
  var options = {title: "Detect Successfully", type: "info"};
  options.buttons = ["OK"];
  if (!files.length) options.message = "There is no file in backup area.";
  else options.message = "Detect " + String(res / 1024) + "kB of " + String(num) + " files in total.";
  dialog.showMessageBoxSync(options);
}

var noMenu = false;
const menu = Menu.buildFromTemplate(template);
app.on('ready', createWindow)
app.on('activate', () => { if (win === null) createWindow(); })
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})

app.whenReady().then(() => {
  globalShortcut.register("Ctrl+H", () => {
    if (noMenu) { Menu.setApplicationMenu(menu); noMenu = false; }
    else { Menu.setApplicationMenu(null); noMenu = true; }
  })
  globalShortcut.register("Tab", () => {
    BrowserWindow.getFocusedWindow().webContents.send("tabPressed");
  })
})
