'use client'
import { useEffect, useState, ReactNode } from "react";
import {
  BsSun,
  BsMoon,
  BsCloudSun,
  BsCloudMoon,
  BsCloud,
  BsClouds,
  BsCloudRainHeavy,
  BsCloudLightningRain,
  BsSnow2
} from "react-icons/bs";
import {
  LiaCloudSunRainSolid,
  LiaCloudMoonRainSolid
} from "react-icons/lia";
import { TbMist } from "react-icons/tb"
import { getPeriodTemperatures } from "../services/tempPeriods";

type Props = {
    city: string;
}

type WeatherData = {
        name: string;
        timezone: number;
        main:{
            temp: number;   
            humidity: number;
        };
        weather: {
            description: string;
            icon: string;
        }[];
        sys: {
            sunrise: number;
            sunset: number;
        };
        wind: {
            speed: number;
        };
}

export const weatherIconMap: Record<string, ReactNode> = {
  "01d": <BsSun />,
  "01n": <BsMoon />,
  "02d": <BsCloudSun />,
  "02n": <BsCloudMoon />,
  "03d": <BsCloud />,
  "03n": <BsCloud />,
  "04d": <BsClouds />,
  "04n": <BsClouds />,
  "09d": <BsCloudRainHeavy />,
  "09n": <BsCloudRainHeavy />,
  "10d": <LiaCloudSunRainSolid />,
  "10n": <LiaCloudMoonRainSolid />,
  "11d": <BsCloudLightningRain />,
  "11n": <BsCloudLightningRain />,
  "13d": <BsSnow2 />,
  "13n": <BsSnow2 />,
  "50d": <TbMist />,
  "50n": <TbMist />
}

export default function CityWeather({ city }: Props) { 
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [period, setPeriod] = useState<{ dawn: number | null; morning: number | null; afternoon: number | null; night: number | null } | null>(null); 

      useEffect(() => {
            getPeriodTemperatures(city)
            .then(setPeriod)
            .catch(console.error)
  }, [city])
  
    useEffect(() => {
        async function fetchWeather() {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`);
            const data = await response.json();
            setWeatherData(data);
        }

        fetchWeather();
    }, [city])
    
    if (!weatherData) {
        return <div>Checking weather...</div>;
    }

    const sunrise = new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    const celsiusTemp = (kelvin: number) => Math.round(kelvin - 273.15);


    return (
        <div className="cityWeather">
            <h1 className="cityName">{weatherData?.name}</h1>
            <p className="cityDescription">{weatherData?.weather[0].description}</p>
            <h2 className="cityTemperature">{celsiusTemp(weatherData?.main.temp)} °C</h2>
            <div className="weatherIcon">
                {weatherIconMap[weatherData?.weather?.[0]?.icon ?? "01d"]}
            </div>

            <div className="periodTemperatures">
                <div className="dawn">
                    Dawn
                    <BsCloudSun /> 
                    <p>{period?.dawn ?? "--"}°C</p>
                </div>
                <div className="morning">
                    Morning 
                    <BsSun />
                    <p>{period?.morning ?? "--"}°C</p>
                </div>
                <div className="afternoon">
                    Afternoon 
                    <BsCloudSun />
                    <p>{period?.afternoon ?? "--"}°C</p>
                </div>
                <div className="night">
                    Night 
                    <BsMoon />
                    <p>{period?.night ?? "--"}°C</p>
                </div>
            </div>

            <div className="additionalInfo">
                <div className="windSpeed">
                    Wind Speed 
                    <p>{weatherData?.wind.speed} m/s</p>
                </div>
                <div className="sunrise">
                    Sunrise 
                    <p>{sunrise}</p>
                </div>
                <div className="sunset">
                    Sunset 
                    <p>{sunset}</p>
                </div>
                <div className="humidity">
                    Humidity 
                    <p>{weatherData?.main.humidity} %</p>
                </div>
            </div>
        </div>
    );
};