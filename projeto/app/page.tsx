'use client'
import { useState } from "react";
import SelectCity from "./components/SelectCity";
import CityWeather from "./components/CityWeather";


export default function InitialPage() {
  const [city, setCity] = useState<string | null>(null);

  return (
    <div className="container">
      {!city ? (<SelectCity onSelect={setCity} />) : (<CityWeather city={city} />
    )}
    </div>
  );
}
