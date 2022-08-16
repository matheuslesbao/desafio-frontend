import { useEffect, useState } from 'react'
import './App.css'
import { useWeatherAPI } from './hooks/useWeatherAPI'
import { IWeather } from './interfaces/IWeather'
import weatherAPI from './services/weatherAPI'

function App() {
  const API_Key = import.meta.env.VITE_APP_OPEN_WHETHER_KEY
  const [city, setCity] = useState('Vila Muriqui')
  const [weatherForecast, setWeatherForecast] = useState<IWeather | null | any>(
    null
  )
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  /*  const { data: api } = useWeatherAPI(
    `v1/current.json?key=${API_Key}&q=${city}&lang=pt`
  ) */
  function handleChange(e: any) {
    setCity(e.target.value)
  }
  function handleSearchCity() {
    weatherAPI
      .get(`v1/current.json?key=${API_Key}&q=${city}&lang=pt`)
      .then(response => {
        setWeatherForecast(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
    if (data) {
      return setWeatherForecast(null)
    }
  }

  return (
    <div id="weather">
      <header>
        <h1>Previsão do tempo</h1>
        {isLoading && <p>Carregando......</p>}

        {weatherForecast ? (
          <div className="box">
            <span className="box__title">
              {weatherForecast.location.name +
                ',' +
                weatherForecast.location.country}
            </span>
            <div className="box__sub-title">
              <span>
                {weatherForecast.current.temp_c +
                  ' ºC ' +
                  weatherForecast.current.condition.text}
              </span>
              <img
                className="box__image"
                src={weatherForecast.current.condition.icon}
                alt="ícone de previsão"
              />
            </div>
            <div>
              <span>
                <b>**16º</b>
                <b>**25º</b>
                Sensação <b>{weatherForecast.current.feelslike_c + ' ºC '}</b>
              </span>
              <br />
              <span>
                <span>
                  Vento: <b>{weatherForecast.current.wind_kph + 'km/h'}</b>
                </span>
                <span>
                  Umidade: <b>{weatherForecast.current.humidity + '%'}</b>
                </span>
              </span>
            </div>
          </div>
        ) : null}

        <input
          type="text"
          name="city"
          onChange={handleChange}
          value={city}
          spellCheck="false"
          placeholder="Insira aqui o nome da cidade"
          size={50}
        />
        <span>
          <button onClick={handleSearchCity}>OK</button>
        </span>
      </header>
      <section>
        <h3>Capitais</h3>

        <table>
          <thead>
            <tr>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </thead>
          <tr>
            <td>18º</td>
            <td>27º</td>
            <td>Rio de Janeiro</td>
          </tr>
          <tr>
            <td>18º</td>
            <td>27º</td>
            <td>Sao paulo</td>
          </tr>
        </table>
        <table>
          <thead>
            <tr>
              <th>Min</th>
              <th>Max</th>
            </tr>
          </thead>
          <tr>
            <td>18º</td>
            <td>27º</td>
            <td>Salvador</td>
          </tr>
          <tr>
            <td>18º</td>
            <td>27º</td>
            <td>Curitiba</td>
          </tr>
        </table>
      </section>

      <footer>Study app develop</footer>
    </div>
  )
}
export default App
