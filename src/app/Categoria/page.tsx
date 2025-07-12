"use client";
import { useState, useMemo } from "react";
import { Grid, List } from "lucide-react";
import { UniformProps } from "@/Types/uniforms";
import Image from "next/image";
import data from "../../../public/data/uniformes-futbol.json";

const CatalogoVista: React.FC<UniformProps> = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("Todas");
  const [selectedGenero, setSelectedGenero] = useState("Sexo");
  const [precioMin, setPrecioMin] = useState<number | "">(0);
  const [precioMax, setPrecioMax] = useState<number | "">("");
  const [orden, setOrden] = useState("default");

  const subcategorias = useMemo(() => {
    return [
      "Todas",
      ...Array.from(new Set(data.map((item) => item.nombreSubCategoria))),
    ];
  }, [data]);

  const generos = useMemo(() => {
    return ["Sexo", ...Array.from(new Set(data.map((item) => item.genero)))];
  }, [data]);

  const productosFiltrados = useMemo(() => {
    let filtrados = [...data];

    if (selectedSubcategoria !== "Todas") {
      filtrados = filtrados.filter(
        (item) => item.nombreSubCategoria === selectedSubcategoria
      );
    }

    if (selectedGenero !== "Sexo") {
      filtrados = filtrados.filter((item) => item.genero === selectedGenero);
    }

    const min = typeof precioMin === "number" ? precioMin : 0;
    const max =
      typeof precioMax === "number" ? precioMax : Number.MAX_SAFE_INTEGER;

    filtrados = filtrados.filter(
      (item) => item.precio >= min && item.precio <= max
    );

    if (orden === "asc") {
      filtrados.sort((a, b) => a.precio - b.precio);
    } else if (orden === "desc") {
      filtrados.sort((a, b) => b.precio - a.precio);
    }

    return filtrados;
  }, [data, selectedSubcategoria, selectedGenero, precioMin, precioMax, orden]);

  {
    /*Resetear Filtros*/
  }
  const resetFiltros = () => {
    setSelectedSubcategoria("Todas");
    setPrecioMin(0);
    setSelectedGenero("Sexo");
    setPrecioMax("");
    setOrden("default");
  };

  return (
    <section className="max-w-7xl mx-auto p-4 text-[#190E46]">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-4">
        <div className="flex flex-wrap gap-2 items-center text-sm">
          {/*Columnas */}

          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid" ? "bg-[#190E46] text-white" : "bg-gray-200"
            }`}
          >
            <Grid size={18} />
          </button>
          {/*Filas */}
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list" ? "bg-[#190E46] text-white" : "bg-gray-200"
            }`}
          >
            <List size={18} />
          </button>
          {/*Sub Categoria */}
          <select
            value={selectedSubcategoria}
            onChange={(e) => setSelectedSubcategoria(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {subcategorias.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/* Genero */}
          <select
            value={selectedGenero}
            onChange={(e) => setSelectedGenero(e.target.value)}
            className="border rounded px-2 py-1"
          >
            {generos.map((cat, idx) => (
              <option key={idx} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {/*Precio Minimo */}
          <input
            type="number"
            placeholder="Mín $"
            className="border rounded px-2 py-1 w-20"
            value={precioMin}
            onChange={(e) =>
              setPrecioMin(e.target.value ? Number(e.target.value) : "")
            }
          />
          {/*Precio Max */}
          <input
            type="number"
            placeholder="Máx $"
            className="border rounded px-2 py-1 w-20"
            value={precioMax}
            onChange={(e) =>
              setPrecioMax(e.target.value ? Number(e.target.value) : "")
            }
          />
          {/*Ordenar por < | > */}
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="default">Ordenar por</option>
            <option value="asc">Precio (menor a mayor)</option>
            <option value="desc">Precio (mayor a menor)</option>
          </select>
          {/*Resetear Filtros */}
          <button
            onClick={resetFiltros}
            className="underline ml-2 text-red-500"
          >
            Borrar filtros
          </button>
          {/*/////////////////////Fin///////////////////////////// */}
        </div>
      </div>

      {productosFiltrados.length === 0 ? (
        <p className="text-gray-500">No se encontraron productos.</p>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-2 md:grid-cols-4 gap-4"
              : "flex flex-col gap-4"
          }
        >
          {productosFiltrados.map((item) =>
            viewMode === "grid" ? (
              <div
                key={item.id}
                className="border rounded-lg shadow-md p-4 bg-white w-full max-w-xs flex-shrink-0"
              >
                <Image
                  src={item.image}
                  alt={item.descripcion}
                  width={300}
                  height={300}
                  className="object-contain h-auto w-auto max-h-[220px] border-2 rounded-2xl shadow-sm mx-auto"
                />
                <h3 className="text-[#190E46] font-bold text-lg mb-2 mt-4">
                  {item.categoria}
                </h3>
                <h6>{item.equipo}</h6>
                <p className="text-gray-700 text-sm mb-4">{item.descripcion}</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-700 font-semibold">
                    ${item.precio} {item.moneda}
                  </span>
                  <button className="bg-[#190E46] text-white px-4 py-2 rounded hover:bg-indigo-800 text-sm">
                    Comprar
                  </button>
                </div>
              </div>
            ) : (
              <div
                key={item.id}
                className="flex items-center gap-4 border p-4 rounded bg-white"
              >
                <Image
                  src={item.image}
                  alt={item.descripcion}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                />
                <div>
                  <h3 className="font-bold text-[#190E46]">{item.categoria}</h3>
                  <p className="text-sm text-gray-600">{item.descripcion}</p>
                  <p className="text-green-700 font-semibold mt-1">
                    ${item.precio} MXN
                  </p>
                  <button className="bg-[#190E46] text-white px-4 py-2 rounded hover:bg-indigo-800 text-sm">
                    Comprar
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
};

export default CatalogoVista;
