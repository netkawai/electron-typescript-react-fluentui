import * as React from "react"
import { Icon } from "@fluentui/react/lib/Icon"
import { AppState } from "../model/app"
import { ProgressIndicator, IObjectWithKey } from "@fluentui/react"
import { WindowStateListenerType } from "../schema-types"
import { useTranslation } from "react-i18next"
type NavProps = {
    state: AppState
    itemShown: boolean
    menu: () => void
    search: () => void
    markAllRead: () => void
    fetch: () => void
    logs: () => void
    views: () => void
    settings: () => void
}


const ChromeMenu = (props: NavProps) => {

    const {t} = useTranslation()

    const [maximized,setState] = React.useState(window.utils.isMaximized())

    const setBodyFocusState = (focused: boolean) => {
        if (focused) document.body.classList.remove("blur")
        else document.body.classList.add("blur")
    }

    const setBodyFullscreenState = (fullscreen: boolean) => {
        if (fullscreen) document.body.classList.remove("not-fullscreen")
        else document.body.classList.add("not-fullscreen")
    }

    const windowStateListener = (type: WindowStateListenerType, state: boolean) => {
        switch (type) {
            case WindowStateListenerType.Maximized:
                setState(state)
                break
            case WindowStateListenerType.Fullscreen:
                setBodyFullscreenState(state)
                break
            case WindowStateListenerType.Focused:
                setBodyFocusState(state)
                break
        }
    }

    const navShortcutsHandler = (e: KeyboardEvent | IObjectWithKey) => {
        if (!props.state.settings.display) {
            switch (e.key) {
                case "F1":
                    props.menu()
                    break
                case "F2":
                    props.search()
                    break
                case "F5":
                    fetch()
                    break
                case "F6":
                    props.markAllRead()
                    break
                case "F7":
                    if (!props.itemShown) props.logs()
                    break
                case "F8":
                    if (!props.itemShown) props.views()
                    break
                case "F9":
                    if (!props.itemShown) props.settings()
                    break
            }
        }
    }

    const componentDidMount = () => {
        document.addEventListener("keydown", navShortcutsHandler)
        if (window.utils.platform === "darwin")
            window.utils.addTouchBarEventsListener(navShortcutsHandler)
    }
    const componentWillUnmount = () => {
        document.removeEventListener("keydown", navShortcutsHandler)
    }

    const minimize = () => {
        window.utils.minimizeWindow()
    }
    const maximize = () => {
        window.utils.maximizeWindow()
        setState(!maximized)
    }
    const close = () => {
        window.utils.closeWindow()
    }

    const canFetch = () =>
        props.state.sourceInit &&
        props.state.feedInit &&
        !props.state.syncing &&
        !props.state.fetchingItems
    const getClassNames = () => {
        const classNames = new Array<string>()
        if (props.state.settings.display) classNames.push("hide-btns")
        if (props.state.menu) classNames.push("menu-on")
        if (props.itemShown) classNames.push("item-on")
        return classNames.join(" ")
    }

    const fetch = () => {
        if (canFetch()) props.fetch()
    }


    const getProgress = () => {
        return props.state.fetchingTotal > 0
            ? props.state.fetchingProgress / props.state.fetchingTotal
            : null
    }

    setBodyFocusState(window.utils.isFocused())
    setBodyFullscreenState(window.utils.isFullscreen())
    window.utils.addWindowStateListener(windowStateListener)

        return (
            <>
            <nav className={getClassNames()}>
                <div className="btn-group">
                    <a
                        className="btn hide-wide"
                        title={t("nav.menu")}
                        onClick={props.menu}>
                        <Icon
                            iconName={
                                window.utils.platform === "darwin"
                                    ? "SidePanel"
                                    : "GlobalNavButton"
                            }
                        />
                    </a>
                </div>
                <span className="title">{props.state.title}</span>
                <div className="btn-group" style={{ float: "right" }}>
					{}
                    <span className="separator"></span>
                    <a
                        className="btn system"
                        title={t("nav.minimize")}
                        onClick={minimize}
                        style={{ fontSize: 12 }}>
                        <Icon iconName="Remove" />
                    </a>
                    <a
                        className="btn system"
                        title={t("nav.maximize")}
                        onClick={maximize}>
                        {maximized ? (
                            <Icon
                                iconName="ChromeRestore"
                                style={{ fontSize: 11 }}
                            />
                        ) : (
                            <Icon
                                iconName="Checkbox"
                                style={{ fontSize: 10 }}
                            />
                        )}
                    </a>
                    <a
                        className="btn system close"
                        title={t("close")}
                        onClick={close}>
                        <Icon iconName="Cancel" />
                    </a>
                </div>
                {!canFetch() && (
                    <ProgressIndicator
                        className="progress"
                        percentComplete={getProgress()}
                    />
                )}
            </nav>
            </>
        )
}

export default ChromeMenu
