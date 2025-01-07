'use strict'

import {app, BrowserWindow, protocol, ipcMain, dialog, nativeImage} from 'electron'
import {createProtocol} from 'vue-cli-plugin-electron-builder/lib'
import installExtension, {VUEJS3_DEVTOOLS} from 'electron-devtools-installer'
import {autoUpdater} from "electron-updater"
import {Party} from "@/api/party";
import {XY} from "@/api/game";
import path from "path";
import fs from "fs";


const saveReader = require('@/api/saveReader')
const WebSocket = require('ws');
const config = require('config');
const toml = require('toml');
const TOML = require('@iarna/toml');

function loadTomlConfig(win) {
    const tomlFilePath = 'config/config.toml'; // Ruta a tu archivo TOML
    if (!fs.existsSync(tomlFilePath)) {
        let save_file = dialog.showOpenDialogSync(win, {
            title: 'Selecciona tu archivo de guardado',
            icon: nativeImage.createFromPath('./public/icon.png'),
            properties: ['openFile'],
            message: 'Archivos de guardado',
            defaultPath: path.join(process.env.APPDATA, '\\Citra\\sdmc\\Nintendo 3DS\\00000000000000000000000000000000\\00000000000000000000000000000000\\title\\00040000\\00055e00\\data\\00000001')
        });
        let data = {
            app: {
                websocket: 'ws://localhost:8000/',
                save_file: save_file[0]
            }
        }
        const stringed = TOML.stringify(data);
        fs.mkdirSync('config')
        fs.writeFile(tomlFilePath, stringed, console.log)
        return toml.parse(stringed); // Parseamos el contenido TOML
    } else {
        const tomlContent = fs.readFileSync(tomlFilePath, 'utf-8');
        return toml.parse(tomlContent); // Parseamos el contenido TOML
    }
}


const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
    {scheme: 'app', privileges: {secure: true, standard: true}}
])

async function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 1200,
        height: 710,
        icon: './public/icons/icon.png',
        autoHideMenuBar: true,
        resizable: false,
        webPreferences: {
            // Use pluginOptions.nodeIntegration, leave this alone
            // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
            nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
            contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
            preload: path.join(__dirname, 'preload.js')
        }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
        if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
        createProtocol('app')
        // Load the index.html when not in development
        await win.loadURL('app://./index.html')
        autoUpdater.checkForUpdates().then((res) => {
            res.downloadPromise.then(() => {
                dialog.showMessageBox(win, {
                    type: 'info',
                    icon: nativeImage.createFromPath('./public/icon.png'),
                    message: 'New Update Found',
                    detail: 'A new update has been found, program will close to install it',
                    buttons: ['Close'],
                    defaultId: 0
                }).then(() => {
                    app.quit();
                })
            })
        })
    }
    return win
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
    let win = await createWindow();
    const tomlConfig = loadTomlConfig(win);
    config.util.extendDeep(config, tomlConfig);
    let SOCKET_URL = config.get('app.websocket');

    if (isDevelopment && !process.env.IS_TEST) {
        // Install Vue Devtools
        try {
            await installExtension(VUEJS3_DEVTOOLS)
        } catch (e) {
            console.error('Vue Devtools failed to install:', e.toString())
        }
    }

    let game = XY;
    let client = null;
    ipcMain.on('open_channel', async (event) => {
        if (client) {
            client.close();
            saveReader.stopWatching();
        }
        client = new WebSocket(SOCKET_URL).on('error', () => {
            console.log(`error connecting to web socket ${SOCKET_URL}`)
        });

        saveReader.watchSave(config.get("app.save_file"));

        let yourParty = new Party(game, 'you');
        let enemyParty = new Party(game, 'enemy');
        enemyParty.loadTeam(null, event);
        yourParty.loadTeam(client, event);
    });
    win.reload();
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
    if (process.platform === 'win32') {
        process.on('message', (data) => {
            if (data === 'graceful-exit') {
                app.quit()
            }
        })
    } else {
        process.on('SIGTERM', () => {
            app.quit()
        })
    }
}
