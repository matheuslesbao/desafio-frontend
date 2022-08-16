export interface IWeather {
  current: {
    condition: {
      text: string
      icon: HTMLImageElement | any
    }
    humidity: number
    wind_kph: number
    temp_c: number
    feelslike_c: number
  }
  location: {
    country: string
    name: string
  }
}