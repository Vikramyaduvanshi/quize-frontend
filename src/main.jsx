import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authcontex.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider1 } from './components/ui/provider.jsx'
import {Provider} from "react-redux"
import { store } from './redux/store.js'
createRoot(document.getElementById('root')).render(
 
<BrowserRouter>
<AuthProvider>
<Provider1>
<Provider store={store}>
    <App />
</Provider>
</Provider1>
</AuthProvider>
</BrowserRouter>

)
