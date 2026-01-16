'use client'
import { useEffect, useState } from "react";

type Props = {
    city: string;
    onBack: () => void;
}

type WeatherData = {
    name: string;
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

export default function CityWeather({ city, onBack }: Props) { 
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.KEY}`);
            const data = await response.json();
            setWeatherData(data);
        }
        fetchWeather();
    }, [city])

    const sunrise = weatherData ? new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString() : '';
    const sunset = weatherData ? new Date(weatherData.sys.sunset * 1000).toLocaleTimeString() : '';
};