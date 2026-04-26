"use client";

import { useMemo, useState } from "react";

const cars = Array.from({ length: 120 }).map((_, i) => {
  const types = ["elektryk", "spalinowy"];
  const cats = ["suv", "sedan", "kombi", "sport", "hatchback"];

  return {
    id: i,
    name: `AutoFinder Car ${i + 1}`,
    type: types[i % 2],
    category: cats[i % cats.length],
    power: 150 + (i % 500),
    range: 300 + (i % 400),
    price: 80000 + i * 2500,
    img: `https://source.unsplash.com/600x400/?car,${cats[i % cats.length]}`
  };
});

export default function Page() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return cars.filter((car) => {
      const s = car.name.toLowerCase().includes(search.toLowerCase());
      const f = filter === "all" || car.type === filter || car.category === filter;
      return s && f;
    });
  }, [search, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">

      {/* HEADER */}
      <header className="p-6 border-b border-white/10">
        <h1 className="text-4xl font-bold tracking-tight">🚗 AutoFinder</h1>
        <p className="text-white/60 mt-1">
          Znajdź idealne auto dla siebie
        </p>
      </header>

      {/* SEARCH + FILTERS */}
      <div className="p-6 flex flex-col gap-4">

        <input
          className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 outline-none"
          placeholder="🔍 Szukaj auta..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex flex-wrap gap-2">
          {["all", "elektryk", "spalinowy", "suv", "sedan", "kombi", "sport"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-1 rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <div className="p-6 grid md:grid-cols-3 gap-6">

        {filtered.map((car) => (
          <div
            key={car.id}
            className="rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:scale-[1.02] transition"
          >
            <img
              src={car.img}
              className="w-full h-44 object-cover"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold">{car.name}</h2>

              <div className="text-sm text-white/60 mt-2 space-y-1">
                <p>⚡ Moc: {car.power} KM</p>
                <p>🔋 Zasięg: {car.range} km</p>
                <p>💰 Cena: {car.price.toLocaleString()} zł</p>
              </div>

              <div className="mt-3 text-xs text-white/40">
                {car.type} • {car.category}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <footer className="p-6 text-center text-white/40 text-sm border-t border-white/10">
        AutoFinder • nowoczesna wyszukiwarka samochodów
      </footer>

    </div>
  );
}