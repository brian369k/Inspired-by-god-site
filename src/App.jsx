import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductCustomizer from './pages/ProductCustomizer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                     element={<Home />} />
        <Route path="/shop"                 element={<Shop />} />
        <Route path="/customize/:productId" element={<ProductCustomizer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App