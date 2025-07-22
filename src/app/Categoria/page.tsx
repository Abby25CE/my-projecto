"use client";
import { useState, useMemo } from "react";
import { Grid, List, Filter, X, SlidersHorizontal } from "lucide-react";
import { UniformProps } from "@/Types/uniforms";
import Image from "next/image";
import data from "../../../public/data/uniformes-futbol.json";
import { useRouter } from "next/navigation";

const CatalogoVista: React.FC<UniformProps> = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedSubcategoria, setSelectedSubcategoria] = useState("Todas");
  const [selectedGenero, setSelectedGenero] = useState("Genero");
  const [precioMin, setPrecioMin] = useState<number | "">(0);
  const [precioMax, setPrecioMax] = useState<number | "">("");
  const [orden, setOrden] = useState("default");
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const router = useRouter();

  const handleClick = (slug: string) => {
    router.push(`/Producto/${slug}`);
  };

  const handleComprar = (e: React.MouseEvent, slug: string) => {
    e.stopPropagation();
    router.push(`/Producto/${slug}`);
  };

  const subcategorias = useMemo(() => {
    return [
      "Todas",
      ...Array.from(new Set(data.map((item) => item.nombreSubCategoria))),
    ];
  }, []);

  const generos = useMemo(() => {
    return ["Genero", ...Array.from(new Set(data.map((item) => item.genero)))];
  }, []);

  const productosFiltrados = useMemo(() => {
    let filtrados = [...data];

    if (selectedSubcategoria !== "Todas") {
      filtrados = filtrados.filter(
        (item) => item.nombreSubCategoria === selectedSubcategoria
      );
    }

    if (selectedGenero !== "Genero") {
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
  }, [selectedSubcategoria, selectedGenero, precioMin, precioMax, orden]);

  const resetFiltros = () => {
    setSelectedSubcategoria("Todas");
    setPrecioMin(0);
    setSelectedGenero("Genero");
    setPrecioMax("");
    setOrden("default");
  };

  const filtrosActivos = useMemo(() => {
    return (
      selectedSubcategoria !== "Todas" ||
      selectedGenero !== "Genero" ||
      precioMin !== 0 ||
      precioMax !== "" ||
      orden !== "default"
    );
  }, [selectedSubcategoria, selectedGenero, precioMin, precioMax, orden]);

  return (
    <>
      {/* Overlay para móvil */}
      {filtrosAbiertos && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setFiltrosAbiertos(false)}
        />
      )}

      <section className="relative max-w-7xl mx-auto p-4 text-[#190E46]">
        {/* Header con controles de vista y botón de filtros */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Catálogo</h1>
            <span className="text-sm text-gray-600">
              {productosFiltrados.length} productos
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Controles de vista */}
            <div className="flex border rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 transition-colors ${
                  viewMode === "grid"
                    ? "bg-[#190E46] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 transition-colors ${
                  viewMode === "list"
                    ? "bg-[#190E46] text-white"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                <List size={18} />
              </button>
            </div>

            {/* Botón de filtros */}
            <button
              onClick={() => setFiltrosAbiertos(true)}
              className="flex items-center gap-2 bg-[#190E46] text-white px-4 py-2 rounded-lg shadow-lg relative hover:bg-indigo-800 transition-colors"
            >
              <SlidersHorizontal size={18} />
              Filtrar
              {filtrosActivos && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  !
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Panel lateral de filtros para móvil */}
        <div
          className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${
            filtrosAbiertos ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header del panel */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Filter size={20} />
                Filtros
                {filtrosActivos && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    Activos
                  </span>
                )}
              </h3>
              <button
                onClick={() => setFiltrosAbiertos(false)}
                className="text-gray-600 hover:text-gray-900 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenido de filtros */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Subcategoría
                </label>
                <select
                  value={selectedSubcategoria}
                  onChange={(e) => setSelectedSubcategoria(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#190E46] focus:border-transparent"
                >
                  {subcategorias.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Género</label>
                <select
                  value={selectedGenero}
                  onChange={(e) => setSelectedGenero(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#190E46] focus:border-transparent"
                >
                  {generos.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Rango de precio
                </label>
                <div className="flex gap-2 ">
                  <input
                    type="number"
                    placeholder="Mín"
                    className="flex-1 border w-1/2 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#190E46] focus:border-transparent"
                    value={precioMin}
                    onChange={(e) =>
                      setPrecioMin(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                  <input
                    type="number"
                    placeholder="Máx"
                    className="flex-1 border w-1/2  rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#190E46] focus:border-transparent"
                    value={precioMax}
                    onChange={(e) =>
                      setPrecioMax(e.target.value ? Number(e.target.value) : "")
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Ordenar por
                </label>
                <select
                  value={orden}
                  onChange={(e) => setOrden(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-[#190E46] focus:border-transparent"
                >
                  <option value="default">Por defecto</option>
                  <option value="asc">Precio (menor a mayor)</option>
                  <option value="desc">Precio (mayor a menor)</option>
                </select>
              </div>
            </div>

            {/* Footer del panel */}
            {filtrosActivos && (
              <div className="p-4 border-t bg-gray-50">
                <button
                  onClick={resetFiltros}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                  Limpiar todos los filtros
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Resultados */}
        {productosFiltrados.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter size={48} className="mx-auto" />
            </div>
            <p className="text-gray-500 text-lg">
              No se encontraron productos con los filtros seleccionados.
            </p>
            {filtrosActivos && (
              <button
                onClick={resetFiltros}
                className="mt-4 text-[#190E46] font-medium underline hover:text-indigo-800"
              >
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6"
                : "flex flex-col gap-4"
            }`}
          >
            {productosFiltrados.map((item) =>
              viewMode === "grid" ? (
                <div
                  key={item.id}
                  className="group border hover:cursor-pointer rounded-lg shadow-md p-4 bg-white hover:shadow-xl transition-all duration-200 flex flex-col h-full"
                  onClick={() => handleClick(item.slug)}
                >
                  <div className="relative mb-4 aspect-square">
                    <Image
                      src={item.image}
                      alt={item.descripcion}
                      fill
                      className="object-contain border-2 rounded-lg shadow-sm group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    />
                  </div>

                  <div className="flex-1 flex flex-col">
                    <h3 className="text-[#190E46] font-bold text-lg mb-1 line-clamp-1">
                      {item.categoria}
                    </h3>
                    <h6 className="text-gray-600 text-sm mb-2 font-medium">
                      {item.equipo}
                    </h6>
                    <p className="text-gray-700 text-sm mb-4 flex-1 line-clamp-2">
                      {item.descripcion}
                    </p>

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mt-auto">
                      <span className="text-green-700 font-bold text-lg">
                        ${item.precio} {item.moneda}
                      </span>
                      <button
                        onClick={(e) => handleComprar(e, item.slug)}
                        className="bg-[#190E46] text-white px-4 py-2 rounded-lg hover:bg-indigo-800 text-sm transition-colors duration-200 w-full sm:w-auto"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  key={item.id}
                  className="flex items-start gap-4 border p-4 rounded-lg bg-white hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleClick(item.slug)}
                >
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.descripcion}
                      fill
                      className="object-contain rounded-lg border"
                      sizes="128px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[#190E46] text-lg mb-1">
                      {item.categoria}
                    </h3>
                    <h6 className="text-gray-600 text-sm mb-2 font-medium">
                      {item.equipo}
                    </h6>
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {item.descripcion}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <span className="text-green-700 font-bold text-lg">
                        ${item.precio} {item.moneda}
                      </span>
                      <button
                        onClick={(e) => handleComprar(e, item.slug)}
                        className="bg-[#190E46] text-white px-4 py-2 rounded-lg hover:bg-indigo-800 text-sm transition-colors duration-200"
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </section>
    </>
  );
};

export default CatalogoVista;
