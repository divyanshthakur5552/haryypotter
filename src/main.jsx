import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Story from './Story.jsx'
import Character from './Character.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Qoutes from './Qoutes.jsx'
import Book from './Book.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/story" element={<Story />} />
        <Route path="/character" element={<Character />} />
        <Route path="/qoutes" element={<Qoutes />} />
        <Route path="/book" element={<Book />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
