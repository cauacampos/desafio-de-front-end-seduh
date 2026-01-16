'use client'
import { useState } from "react";
import SelectCity from "./components/SelectCity";


export default function InitialPage() {
  const [city, setCity] = useState<string | null>(null);

  return (
    <div className="pageContainer">
      {!city ? <SelectCity onSelect={setCity} /> : <div>Clima da cidade: {city}</div>}
    </div>
  );
}
