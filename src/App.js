import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import PrintHome from './pages/PrintHome'
import CategoryPage from './pages/CategoryPage'
import ProductCustomizer from './pages/ProductCustomizer'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<PrintHome />}
        />

        <Route
          path="/print"
          element={<PrintHome />}
        />

        <Route
          path="/print/:category"
          element={<CategoryPage />}
        />

        <Route
          path="/print/product/:id"
          element={<ProductCustomizer />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App