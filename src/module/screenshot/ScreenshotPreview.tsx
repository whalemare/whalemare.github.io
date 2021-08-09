import chroma from 'chroma-js'
import React, { useState } from 'react'

import { ReactComponent as Logo } from './appstore/0_APP_IPHONE_55_0.svg'

interface ScreenshotPreviewProps {}

export const ScreenshotPreview: React.FC<ScreenshotPreviewProps> = () => {
  const [color, setColor] = useState(new URLSearchParams(window.location.search).get('color') ?? '#13718A')

  return (
    <div>
      <header className="App-header">
        <input
          type="text"
          value={color}
          onChange={(e) => {
            setColor(e.target.value)
          }}
        />
        <Logo fill={parseColor(color)} height={500} />
      </header>
    </div>
  )
}

const parseColor = (value: string) => {
  try {
    return chroma(value).hex()
  } catch (e) {
    return value
  }
}
