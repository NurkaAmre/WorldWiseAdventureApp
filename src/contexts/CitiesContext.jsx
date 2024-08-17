import { createContext, useState, useEffect } from 'react';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
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
    <CitiesContext.Provider value={{ cities, loading }}>
      {children}
    </CitiesContext.Provider>
  )
}

export { CitiesProvider, CitiesContext }