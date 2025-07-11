"use client";
import { useEffect, useState } from "react";
import { HiChevronDoubleRight } from "react-icons/hi";

const categories = [
  "FÚTBOL SOCCER",
  "BÁSQUETBOL",
  "BAISBOL",
  "CICLISMO",
  "ATLETISMO",
  "PADEL",
  "TENIS",
  "NATACION",
  "BOX",
  "GIMNASIA",
];

const LOCAL_KEY = "selectedCategory";

const CategoryFilters = () => {
  const [selected, setSelected] = useState<string>(categories[0]);

  // Recuperar del localStorage al montar
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved && categories.includes(saved)) {
      setSelected(saved);
    }
  }, []);

  // Guardar en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, selected);
  }, [selected]);

  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-lg font-semibold text-indigo-950 mb-4">
        Nuestros modelos para ti
      </h2>

      <div className="flex items-center gap-5 overflow-x-auto  scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
              selected === cat
                ? "bg-indigo-900 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}

        <HiChevronDoubleRight className="min-w-[24px] text-gray-800" />
      </div>
    </div>
  );
};

export default CategoryFilters;
