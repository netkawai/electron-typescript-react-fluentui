import * as React from "react"
import {createRoot} from "react-dom/client"
import Frame from "./components/Frame"
import { ThemeProvider } from "@fluentui/react"
import { initializeIcons } from "@fluentui/react/lib/Icons"

initializeIcons("icons/")

const root = createRoot(
    document.getElementById('app') as HTMLElement
)
root.render(
    <React.StrictMode>
      <ThemeProvider>
        <Frame />
      </ThemeProvider>
    </React.StrictMode>
  );

