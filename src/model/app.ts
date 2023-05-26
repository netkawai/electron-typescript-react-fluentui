
import {
    getWindowBreakpoint,
} from "../utils"


export const ALL = "ALL"

export class AppState {
    locale = null as string
    sourceInit = false
    feedInit = false
    syncing = false
    fetchingItems = false
    fetchingProgress = 0
    fetchingTotal = 0
    lastFetched = new Date()
    menu = getWindowBreakpoint() && window.settings.getDefaultMenu()
    menuKey = ALL
    title = ""
    settings = {
        display: false,
        changed: false,
        sids: new Array<number>(),
        saving: false,
    }


    constructor() {
    }
}

