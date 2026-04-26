"use client";

import { useState } from "react";

function generateCars() {
  const brands = [
    "Tesla", "BMW", "Audi", "Mercedes", "Toyota",
    "Hyundai", "Ford", "Volkswagen", "Skoda", "Nissan"
  ];

  const types = ["SUV", "Sport", "Combi", "Sedan", "Hatchback"];
  const fuels = ["Elektryczny", "Spalinowy", "Hybryda"];

  const cars = [];

  for (let i = 1; i <= 150; i++) {
    const brand = brands[i % brands.length];

    const fuel =
      i % 3 === 0 ? "Elektryczny" :
      i % 3 === 1 ? "Spalinowy" :
      "Hybryda";

    cars.push({
      id: i,
      brand,
      model: "Model " + i,
      type: types[i % types.length],
      fuel,
      power: 120 + (i % 500),
      year: 2010 + (i % 15),
      img: "https://via.placeholder.com/600x300?text=Car+" + i,
      desc: "Nowoczesny samochód o świetnym stosunku mocy do komfortu jazdy."
    });
  }

  return cars;
}

export default function Home() {
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");

  const cars = generateCars();

  const filtered = cars.filter(c =>
    `${c.brand} ${c.model}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{
      fontFamily: "Arial",
      padding: 30,
      minHeight: "100vh",
      background: "#cfe8ff",
      color: "#000"
    }}>

      <h1 style={{ fontSize: 32 }}>
        🚗 Mega Portal Samochodowy (150+ aut)
      </h1>

      {/* SZUKAJ */}
      <input
        placeholder="Szukaj auta..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: 12,
          width: "100%",
          marginTop: 20,
          borderRadius: 10,
          border: "1px solid black"
        }}
      />

      {/* LISTA */}
      {!selected && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: 20,
          marginTop: 30
        }}>
          {filtered.map(car => (
            <div
              key={car.id}
              onClick={() => setSelected(car)}
              style={{
                background: "white",
                borderRadius: 15,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
              }}
            >
              <img
                src={car.img}
                style={{ width: "100%", height: 140 }}
              />

              <div style={{ padding: 15 }}>
                <h2>{car.brand} {car.model}</h2>
                <p>⚡ {car.power} KM</p>
                <p>📅 {car.year}</p>
                <p>🔋 {car.fuel}</p>
                <p>🚙 {car.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SZCZEGÓŁY */}
      {selected && (
        <div style={{ marginTop: 30 }}>
          <button onClick={() => setSelected(null)}>
            ⬅ Wróć
          </button>

          <div style={{ background: "white", padding: 20, borderRadius: 15 }}>
            <img src={selected.img} style={{ width: "100%", borderRadius: 10 }} />

            <h1>{selected.brand} {selected.model}</h1>
            <p>{selected.desc}</p>

            <p>⚡ Moc: {selected.power} KM</p>
            <p>📅 Rok: {selected.year}</p>
            <p>🔋 Napęd: {selected.fuel}</p>
            <p>🚙 Typ: {selected.type}</p>
          </div>
        </div>
      )}

    </div>
  );
}