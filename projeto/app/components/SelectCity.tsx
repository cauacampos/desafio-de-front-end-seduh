'use client'
import { LiaGlobeAmericasSolid } from "react-icons/lia";

type Props = {
   onSelect: (city: string) => void;
}

export default function SelectCity({ onSelect }: Props) {
    const cities = [
        "Dallol",
        "Fairbanks",
        "London",
        "Recife",
        "Vancouver",
        "Yakutsk"
    ]

    return (
        <div className="initialScreen">
            <h1>Weather</h1>
            <p>Select the city below</p>

            <div className="planet"><LiaGlobeAmericasSolid /></div>

            <div className="cities">
                {cities.map((city) => (
                    <button key={city} className="city" onClick={() => onSelect(city)}>
                        {city}
                    </button>
                ))}
            </div>
        </div>
    )
}