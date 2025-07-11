"use client";

import { UniformCarousel } from "@/containers/UniformCarousel";
import Image from "next/image";
import data from "../../../public/data/uniformes-futbol.json";

const Producto = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 font-sans text-sm text-neutral-900">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Galería de Imágenes */}
        <div className="bg-gray-100 p-4 relative rounded-lg shadow-sm">
          {/* Navegación lateral */}
          <button className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 shadow">
            ←
          </button>
          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-300 shadow">
            →
          </button>

          {/* Imagen principal */}
          <div className="border border-dashed h-96 flex items-center justify-center rounded-md">
            <span className="text-gray-500">imagen principal</span>
          </div>

          {/* Miniaturas */}
          <div className="flex justify-center mt-4 gap-2">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="border border-dashed px-4 py-2 text-xs bg-white rounded cursor-pointer hover:border-[#190E46]"
              >
                miniatura {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Detalles del Producto */}
        <div className="space-y-4 text-[#190E46]">
          <div className="text-xs text-gray-500">Fútbol 7</div>
          <h2 className="text-2xl font-bold">
            Uniforme Club América Local 2024
          </h2>
          <div className="text-xs text-gray-500">Código: SKU12345</div>

          <div className="flex items-center gap-4">
            <div className="text-xl font-bold">$1,200 MXN</div>
            <div className="text-sm text-gray-700">Por set</div>
          </div>

          {/* Selector de cantidad */}
          <div className="flex items-center gap-2 mt-4">
            <label className="text-sm">Cantidad:</label>
            <input
              id="cantidad"
              type="number"
              min={1}
              defaultValue={1}
              className="border border-gray-300 px-2 py-1 w-24 text-sm rounded"
              placeholder="1"
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button className="bg-[#190E46] text-white px-6 py-2 rounded-full hover:bg-indigo-800 text-sm font-semibold">
              Añadir al Carrito
            </button>
            <button className="border border-gray-400 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-2">
              ❤
            </button>
          </div>

          {/* Descripción Larga */}
          <div className="border border-dashed p-4 mt-4 rounded text-gray-700">
            <h4 className="font-semibold mb-2 text-[#190E46]">
              Descripción del Producto
            </h4>
            <p>
              Uniforme oficial del Club América 2024 con tecnología dry-fit y
              diseño sublimado de alta calidad. Incluye camiseta, short y
              calcetas. Ideal para uso profesional y amateur.
            </p>
          </div>
        </div>
      </div>
      {/* Especificaciones */}
      <div className="border border-dashed p-4 mt-8 rounded text-gray-700">
        <h3 className="font-semibold mb-2 text-[#190E46]">
          Especificaciones Técnicas
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Material: 100% poliéster dry-fit</li>
          <li>Disponible en tallas S, M, L, XL</li>
          <li>Resistente al lavado y desgaste</li>
          <li>Colores oficiales del equipo</li>
        </ul>
      </div>
      <UniformCarousel uniforms={data} />
    </div>
  );
};

export default Producto;
