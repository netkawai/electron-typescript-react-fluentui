import * as React from "react"
import {createRoot} from "react-dom/client"
import Frame from "./components/frame"

import { initializeIcons } from "@fluentui/react/lib/Icons"

initializeIcons("icons/")

const root = createRoot(
    document.getElementById('app') as HTMLElement
)
root.render(
    <React.StrictMode>
      <Frame />
    </React.StrictMode>
  );

