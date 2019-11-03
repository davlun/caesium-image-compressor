import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
} from 'electron';

import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';


const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let worker;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow();

  worker = new BrowserWindow({
    show: false,
    webPreferences: { nodeIntegration: true },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await worker.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}worker`);
    worker.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    await worker.loadURL('app://./worker.html');
  }
});

ipcMain.on('compressionStarted', (event, compressionPayload) => {
  console.log('!!--- Compression Start ---!!');
  worker.webContents.send('compress', compressionPayload);
});

ipcMain.on('compressionFinished', (event, cImage) => {
  if (cImage.status === 2 || cImage.status === -1) {
    console.log(`!!--- Compression finished for ${cImage.fullpath} ---!!`);
  }
  win.webContents.send('cImageCompressionFinished', cImage);
  // ipcRenderer.send('cImageCompressionFinished', cImage);
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
