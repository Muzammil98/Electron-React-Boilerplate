const electron = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

const {app,BrowserWindow,Menu,Tray} = electron

let mainWindow;

// require("update-electron-app")({
//   repo: "https://github.com/aashirMIQ",
//   updateInterval: "1 hour"
// });

function createWindow() {
  console.log("Electron is ready...")

//   let tray = null;
//   tray = new Tray(__dirname + "/icon.png");

//   tray.setToolTip("Oscar Windows");

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    // useContentSize: true,
    // icon: __dirname + "/icon.ico",
    // show: false
    // titleBarStyle: 'hidden',
    // skipTaskbar:true,
    // fullscreen: true
    // closable: false,
    // minimizable:false,
    // maximizable:false,
    // fullscreen:true
    // webPreferences: { webSecurity: false }
  });

  mainWindow.loadURL(
    isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`
  );

  
  mainWindow.maximize();
  mainWindow.show();
//   tray.on("click", () => {
//     mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
//   });
//   mainWindow.on("show", () => {
//     tray.setHighlightMode("always");
//   });
  // mainWindow.on('close', function (event) {
  //   event.preventDefault();
  //   // Some code.
  // });
//   mainWindow.on("hide", () => {
//     tray.setHighlightMode("never");
//   });
  // mainWindow.on("closed", () => {
  //   mainWindow.hide()
  //   // alert("mainWindow closed")
  //   // mainWindow = null
  // });

  mainWindow.on("close", e => {
    console.log("I do not want to be closed");
    e.preventDefault();
    mainWindow.hide();
    // Unlike usual browsers that a message box will be prompted to users, returning
    // a non-void value will silently cancel the close.
    // It is recommended to use the dialog API to let the user confirm closing the
    // application.
    // e.returnValue = false;
  });
//   mainWindow.setMenuBarVisibility(false);
//   mainWindow.setAutoHideMenuBar(false);

  // use this to open dev tools manualy to debug
  if(isDev){
  mainWindow.webContents.openDevTools();
  }
}

app.on("ready", createWindow);
// app.makeSingleInstance((argv, cwd) => {
//   console.log("makeSingleInstance argv : ",argv)
//   console.log("makeSingleInstance cwd : ",cwd)
// })
/* Single Instance Check */
// var iShouldQuit = app.makeSingleInstance(function (commandLine, workingDirectory) {
//   if (mainWindow) {
//     if (mainWindow.isMinimized()) mainWindow.restore();
//     mainWindow.show();
//     mainWindow.focus();
//   }
//   return true;
// });
// if (iShouldQuit) { app.quit(); return; }
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     // app.quit();
//   }
// });

app.on("activate", () => {
  console.log("App on activate !!!")
  if (mainWindow === null) {
    createWindow();
  }
});
