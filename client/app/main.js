// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
var session = require('electron').session;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // TODO: ses appears to be an empty object
  const ses = session.fromPartition('persist:name')
  process.stdout.write(JSON.stringify(ses))
  ses.defaultStorage.set({name: 'david'}, (error) => {
    if(error) {
      process.stdout.write(error)
      process.exit(1)
    }
  })
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 300, alwaysOnTop: true})

  // and load the index.html of the app.node js s
  mainWindow.loadFile('./build/index.html')

  app.focus()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

process.stdout.write(require('electron').keys())

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
