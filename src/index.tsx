import * as React from "react"
import * as ReactDOM from "react-dom"
import {createRoot} from "react-dom/client"
import Root from "./root"

import { initializeIcons } from "@fluentui/react/lib/Icons"

initializeIcons("icons/")

const top_root = createRoot(
    document.getElementById('app') as HTMLElement
)
top_root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );

