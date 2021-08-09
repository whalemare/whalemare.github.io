import { createTheme, ThemeProvider } from '@material-ui/core'
import './App.css'

import { MetadataScreen } from './module/metadata/MetadataScreen'

const theme = createTheme({
  palette: {
    primary: { main: '#3c67d6' },
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <MetadataScreen />
      </ThemeProvider>
    </div>
  )
}

export default App
