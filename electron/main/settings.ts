import Store  from "electron-store"

import {
    SchemaTypes,
    ViewType,
    ThemeSettings,
    ViewConfigs,
} from "../../src/schema-types"
import { ipcMain, session, nativeTheme, app } from "electron"
import { WindowManager } from "./window"

export const store = new Store<SchemaTypes>()


const MENU_STORE_KEY = "menuOn"
ipcMain.on("get-menu", event => {
    event.returnValue = store.get(MENU_STORE_KEY, false)
})
ipcMain.handle("set-menu", (_, state: boolean) => {
    store.set(MENU_STORE_KEY, state)
})

const PAC_STORE_KEY = "pac"
const PAC_STATUS_KEY = "pacOn"
function getProxyStatus() {
    return store.get(PAC_STATUS_KEY, false)
}
function toggleProxyStatus() {
    store.set(PAC_STATUS_KEY, !getProxyStatus())
    setProxy()
}
function getProxy() {
    return store.get(PAC_STORE_KEY, "")
}
function setProxy(address = null) {
    if (!address) {
        address = getProxy()
    } else {
        store.set(PAC_STORE_KEY, address)
    }
    if (getProxyStatus()) {
        let rules = { pacScript: address }
        session.defaultSession.setProxy(rules)
        session.fromPartition("sandbox").setProxy(rules)
    }
}
ipcMain.on("get-proxy-status", event => {
    event.returnValue = getProxyStatus()
})
ipcMain.on("toggle-proxy-status", () => {
    toggleProxyStatus()
})
ipcMain.on("get-proxy", event => {
    event.returnValue = getProxy()
})
ipcMain.handle("set-proxy", (_, address = null) => {
    setProxy(address)
})

const VIEW_STORE_KEY = "view"
ipcMain.on("get-view", event => {
    event.returnValue = store.get(VIEW_STORE_KEY, ViewType.Cards)
})
ipcMain.handle("set-view", (_, viewType: ViewType) => {
    store.set(VIEW_STORE_KEY, viewType)
})

const THEME_STORE_KEY = "theme"
ipcMain.on("get-theme", event => {
    event.returnValue = store.get(THEME_STORE_KEY, ThemeSettings.Default)
})
ipcMain.handle("set-theme", (_, theme: ThemeSettings) => {
    store.set(THEME_STORE_KEY, theme)
    nativeTheme.themeSource = theme
})
ipcMain.on("get-theme-dark-color", event => {
    event.returnValue = nativeTheme.shouldUseDarkColors
})
export function setThemeListener(manager: WindowManager) {
    nativeTheme.removeAllListeners()
    nativeTheme.on("updated", () => {
        if (manager.hasWindow()) {
            let contents = manager.mainWindow.webContents
            if (!contents.isDestroyed()) {
                contents.send("theme-updated", nativeTheme.shouldUseDarkColors)
            }
        }
    })
}

const LOCALE_STORE_KEY = "locale"
ipcMain.handle("set-locale", (_, option: string) => {
    store.set(LOCALE_STORE_KEY, option)
})
function getLocaleSettings() {
    return store.get(LOCALE_STORE_KEY, "default")
}
ipcMain.on("get-locale-settings", event => {
    event.returnValue = getLocaleSettings()
})
ipcMain.on("get-locale", event => {
    let setting = getLocaleSettings()
    let locale = setting === "default" ? app.getLocale() : setting
    event.returnValue = locale
})

const FONT_SIZE_STORE_KEY = "fontSize"
ipcMain.on("get-font-size", event => {
    event.returnValue = store.get(FONT_SIZE_STORE_KEY, 16)
})
ipcMain.handle("set-font-size", (_, size: number) => {
    store.set(FONT_SIZE_STORE_KEY, size)
})

const FONT_STORE_KEY = "fontFamily"
ipcMain.on("get-font", event => {
    event.returnValue = store.get(FONT_STORE_KEY, "")
})
ipcMain.handle("set-font", (_, font: string) => {
    store.set(FONT_STORE_KEY, font)
})

ipcMain.on("get-all-settings", event => {
    let output = {}
    for (let [key, value] of store) {
        output[key] = value
    }
    event.returnValue = output
})

const FETCH_INTEVAL_STORE_KEY = "fetchInterval"
ipcMain.on("get-fetch-interval", event => {
    event.returnValue = store.get(FETCH_INTEVAL_STORE_KEY, 0)
})
ipcMain.handle("set-fetch-interval", (_, interval: number) => {
    store.set(FETCH_INTEVAL_STORE_KEY, interval)
})


const LIST_CONFIGS_STORE_KEY = "listViewConfigs"
ipcMain.on("get-view-configs", (event, view: ViewType) => {
    switch (view) {
        case ViewType.List:
            event.returnValue = store.get(
                LIST_CONFIGS_STORE_KEY,
                ViewConfigs.ShowCover
            )
            break
        default:
            event.returnValue = undefined
            break
    }
})
ipcMain.handle(
    "set-view-configs",
    (_, view: ViewType, configs: ViewConfigs) => {
        switch (view) {
            case ViewType.List:
                store.set(LIST_CONFIGS_STORE_KEY, configs)
                break
        }
    }
)
