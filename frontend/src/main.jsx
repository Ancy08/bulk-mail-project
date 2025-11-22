import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from "./Signup.jsx"
import Login from "./Login.jsx"
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Signup/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/home" element={<App/>}></Route>
      <Route path="*" element={<Signup/>}></Route>
        
    </Routes>
  </BrowserRouter>
)
