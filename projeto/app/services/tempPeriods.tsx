type Hour = {
  time_epoch: number
  temp_c: number
}

type ForecastDay = {
  hour: Hour[]
}

type WeatherApiResponse = {
  forecast: {
    forecastday: ForecastDay[]
  }
}

export async function getPeriodTemperatures(city: string) {
  const res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY_2}&q=${encodeURIComponent(
      city
    )}&days=1&aqi=no&alerts=no`
  )

  const json: WeatherApiResponse = await res.json()

  if (!res.ok || !json.forecast?.forecastday?.[0]) {
    throw new Error("Resposta inválida da WeatherAPI")
  }

  const hours = json.forecast.forecastday[0].hour

  const result: Record<"dawn" | "morning" | "afternoon" | "night", number | null> = {
    dawn: null,
    morning: null,
    afternoon: null,
    night: null
  }

  hours.forEach(h => {
    const localHour = new Date(h.time_epoch * 1000).getHours()

    if (localHour === 3) result.dawn = Math.round(h.temp_c)
    if (localHour === 9) result.morning = Math.round(h.temp_c)
    if (localHour === 15) result.afternoon = Math.round(h.temp_c)
    if (localHour === 21) result.night = Math.round(h.temp_c)
  })

  return result
}
