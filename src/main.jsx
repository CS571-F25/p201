import { StrictMode } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './structural/App';

createRoot(document.getElementById('root')).render(
    <App />
)
