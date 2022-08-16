import { useEffect, useState } from "react";
import { IWeather } from '../interfaces/IWeather'
import weatherAPI from "../services/weatherAPI";


export function useWeatherAPI<T = unknown | IWeather>(url: string) {
  const [data, setData] = useState<T | null >(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    weatherAPI.get(url)
      .then(response => {
        setData(response.data)
    }).catch(error => {
      setError(error)
      if(error){
        return console.log(`algo de errado na requisição ${error.message}`)
      }
    }) 
    .finally(() => {
      setIsLoading(false)
    })
  }, [])
  
  return { data, isLoading, error }
}