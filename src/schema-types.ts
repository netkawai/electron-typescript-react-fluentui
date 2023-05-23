// Copy from https://github.com/yang991178/fluent-reader as skelton


export const enum ViewType {
    Cards,
    List,
    Magazine,
    Compact,
    Customized,
}

export const enum ViewConfigs {
    ShowCover = 1 << 0,
    ShowSnippet = 1 << 1,
    FadeRead = 1 << 2,
}

export const enum ThemeSettings {
    Default = "system",
    Light = "light",
    Dark = "dark",
}


export const enum ImageCallbackTypes {
    OpenExternal,
    OpenExternalBg,
    SaveAs,
    Copy,
    CopyLink,
}

export const enum SyncService {
    None,
	Getpocket,
	Webarchive,
}
export interface ServiceConfigs {
    type: SyncService
    importGroups?: boolean
}

export const enum WindowStateListenerType {
    Maximized,
    Focused,
    Fullscreen,
}

export interface TouchBarTexts {
    menu: string
    search: string
    refresh: string
    markAll: string
    notifications: string
}

export type SchemaTypes = {
    version: string
    theme: ThemeSettings
    pac: string
    pacOn: boolean
    view: ViewType
    locale: string
    fontSize: number
    fontFamily: string
    menuOn: boolean
    fetchInterval: number
    serviceConfigs: ServiceConfigs
    filterType: number
    listViewConfigs: ViewConfigs
    useNeDB: boolean
}
