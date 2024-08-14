import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import Product from "./pages/Product"
import Pricing from "./pages/Pricing"
import PageNotFound from "./pages/PageNotFound"
import AppLayout from "./pages/AppLayout"
import Login from "./pages/Login"
import CityList from "./components/CityList"
import { useState, useEffect } from "react"
import CountryList from "./components/CountryList"

function App() {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)

  const URL = "http://localhost:3001"

  useEffect(() => {
    async function fetchCities() {
      try {
        setLoading(true)
        const response = await fetch(`${URL}/cities`)
        const data = await response.json()
        console.log(data)
        setCities(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data", error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchCities()
  }
  , [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="app" element={<AppLayout />}>
          <Route index element={<CityList cities={cities} loading={loading}/>} />
          <Route path="cities" element={<CityList cities={cities} loading={loading} />} />
          <Route path="countries" element={<CountryList cities={cities} loading={loading} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
