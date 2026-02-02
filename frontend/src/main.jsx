import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Boardgame from './Boardgame.jsx'
import Rules from './Rules.jsx'
import Admin from './Admin.jsx'
import Eightwords from './Eightwords.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Boardgame />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/eightwords" element={<Eightwords />} />
      </Routes>
    </Router>
  </StrictMode>,
)