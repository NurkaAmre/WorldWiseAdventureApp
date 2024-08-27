import { createContext, useState, useEffect, useContext } from 'react';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentCity, setCurrentCity] = useState({})

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
  
  async function getCity(id) {
      try {
        setLoading(true)
        const response = await fetch(`${URL}/cities/${id}`)
        const data = await response.json()
        console.log(data)
        setCurrentCity(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data", error)
      }
      finally {
        setLoading(false)
      }
  }
   
  async function createCity(newCity) {
      try {
        setLoading(true)
        const response = await fetch(`${URL}/cities`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newCity)
        })
        const data = await response.json()
        setCities([...cities, data])

      } catch (error) {
        console.error("Error with creating city", error)
      }
      finally {
        setLoading(false)
      }
  }
  
  async function deleteCity(id) {
      try {
        setLoading(true)
       await fetch(`${URL}/cities/${id}`, {
          method: "DELETE",
          
        })
       
        setCities(cities.filter(city => city.id !== id))

      } catch (error) {
        console.error("Error with deleting city data", error)
      }
      finally {
        setLoading(false)
      }
    }


  return (
    <CitiesContext.Provider value={{ cities, loading, currentCity, getCity, createCity, deleteCity }}>
      {children}
    </CitiesContext.Provider>
  )
}


function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined) {
    throw new Error('CitiesContext was used outside the CitiesProvider')
  }
  return context
}

export { CitiesProvider, useCities }