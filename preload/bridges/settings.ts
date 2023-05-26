import {
    ViewType,
    ThemeSettings,
    ViewConfigs,
} from "../../src/schema-types"
import { ipcRenderer } from "electron"

const settingsBridge = {

    getDefaultMenu: (): boolean => {
        return ipcRenderer.sendSync("get-menu")
    },
    setDefaultMenu: (state: boolean) => {
        ipcRenderer.invoke("set-menu", state)
    },

    getProxyStatus: (): boolean => {
        return ipcRenderer.sendSync("get-proxy-status")
    },
    toggleProxyStatus: () => {
        ipcRenderer.send("toggle-proxy-status")
    },
    getProxy: (): string => {
        return ipcRenderer.sendSync("get-proxy")
    },
    setProxy: (address: string = null) => {
        ipcRenderer.invoke("set-proxy", address)
    },

    getDefaultView: (): ViewType => {
        return ipcRenderer.sendSync("get-view")
    },
    setDefaultView: (viewType: ViewType) => {
        ipcRenderer.invoke("set-view", viewType)
    },

    getThemeSettings: (): ThemeSettings => {
        return ipcRenderer.sendSync("get-theme")
    },
    setThemeSettings: (theme: ThemeSettings) => {
        ipcRenderer.invoke("set-theme", theme)
    },
    shouldUseDarkColors: (): boolean => {
        return ipcRenderer.sendSync("get-theme-dark-color")
    },
    addThemeUpdateListener: (callback: (shouldDark: boolean) => any) => {
        ipcRenderer.on("theme-updated", (_, shouldDark) => {
            callback(shouldDark)
        })
    },

    setLocaleSettings: (option: string) => {
        ipcRenderer.invoke("set-locale", option)
    },
    getLocaleSettings: (): string => {
        return ipcRenderer.sendSync("get-locale-settings")
    },
    getCurrentLocale: (): string => {
        return ipcRenderer.sendSync("get-locale")
    },

    getFontSize: (): number => {
        return ipcRenderer.sendSync("get-font-size")
    },
    setFontSize: (size: number) => {
        ipcRenderer.invoke("set-font-size", size)
    },

    getFont: (): string => {
        return ipcRenderer.sendSync("get-font")
    },
    setFont: (font: string) => {
        ipcRenderer.invoke("set-font", font)
    },


    getViewConfigs: (view: ViewType): ViewConfigs => {
        return ipcRenderer.sendSync("get-view-configs", view)
    },
    setViewConfigs: (view: ViewType, configs: ViewConfigs) => {
        ipcRenderer.invoke("set-view-configs", view, configs)
    },


    getAll: () => {
        return ipcRenderer.sendSync("get-all-settings") as Object
    },

    setAll: configs => {
        ipcRenderer.invoke("import-all-settings", configs)
    },
}

declare global {
    interface Window {
        settings: typeof settingsBridge
    }
}

export default settingsBridge
