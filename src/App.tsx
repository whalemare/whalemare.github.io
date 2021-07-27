import { ReactComponent as Logo } from './screenshots/appstore/0_APP_IPHONE_55_0.svg';
import './App.css';
import { useState } from 'react';
import chroma from 'chroma-js'

function App(props: any) {
  const [color, setColor] = useState(new URLSearchParams(window.location.search).get("color") ?? '#13718A')
  return (
    <div className="App">
      <header className="App-header">
        <input value={color} type="text" onChange={e => {
          setColor(e.target.value)
        }} />
        <Logo height={500} fill={parseColor(color)} />
      </header>
    </div>
  );
}

const parseColor = (value: string) => {
  try {
    return chroma(value).hex()
  } catch(e) {
    return value
  }
}

export default App;
