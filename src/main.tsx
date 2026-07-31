import React from 'react'
import ReactDOM from 'react-dom/client'
import Showcase from './showcase/Showcase'
import { hydrateFont } from './lib/fonts'
import { hydrateTheme } from './lib/theme'
import './index.css'

hydrateTheme()
hydrateFont()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Showcase />
  </React.StrictMode>
)
