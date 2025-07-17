"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";

interface Producto {
  id: number;
  categoria: string;
  descripcion: string;
  precio: number;
  image: string;
}

const WishList = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [view, setView] = useState<"list" | "grid">("grid");

  useEffect(() => {
    fetch("/data/uniformes-futbol.json")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const eliminar = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section className="p-4 max-w-7xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col justify-start items-start gap-3 mb-6">
        <h1 className="text-xl font-semibold text-[#190E46]">MI WISH LIST</h1>

        {/* Botones de vista */}
        <div className="flex gap-2 justify-start">
          <button
            className={`p-2 rounded ${view === "grid" ? "bg-gray-500" : ""}`}
            onClick={() => setView("grid")}
            title="Ver en cuadrícula"
          >
            <IoGridOutline size={20} className="text-gray-400" />
          </button>
          <button
            className={`p-2 rounded ${view === "list" ? "bg-gray-500" : ""}`}
            onClick={() => setView("list")}
            title="Ver en lista"
          >
            <FaList size={20} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* Lista de productos */}
      <div
        className={
          view === "grid" ? "grid gap-4 md:grid-cols-2" : "flex flex-col gap-4"
        }
      >
        {productos.map((producto) => (
          <div
            key={producto.id}
            className="border rounded-lg p-4 flex gap-4 items-start bg-white shadow-sm"
          >
            {/* Imagen Placeholder */}
            <Image
              src={producto.image}
              alt={producto.descripcion}
              width={300}
              height={300}
              className="object-contain h-auto w-auto max-h-[110px] md:max-h-[220px] border-2 ml-7 rounded-2xl shadow-sm"
            />

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-800">
                {producto.descripcion}
              </h3>
              <p className="text-xs text-gray-500 mt-1">Precio unitario</p>
              <p className="text-base font-semibold text-green-700">
                ${producto.precio} MXN
              </p>

              <div className="mt-2 flex gap-4 text-sm">
                <button
                  onClick={() => eliminar(producto.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
                <button className="ml-auto bg-[#190E46] text-white rounded-full px-4 py-1 hover:bg-indigo-900">
                  Añadir al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WishList;
