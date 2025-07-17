"use client";
import { useState, useRef, useEffect } from "react";
import UniformLib from "./UniformLib";
import { UniformProps } from "../Types/uniforms";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface UniformCarouselProps {
  uniforms: UniformProps[];
}

export const UniformCarousel: React.FC<UniformCarouselProps> = ({
  uniforms,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  // Función para calcular elementos por página según el tamaño de pantalla
  const calculateItemsPerPage = () => {
    if (typeof window !== "undefined") {
      const width = window.innerWidth;
      if (width < 640) return 1; // móvil
      if (width < 768) return 2; // tablet pequeña
      if (width < 1024) return 2; // tablet
      if (width < 1280) return 3; // desktop pequeño
      return 3; // desktop grande
    }
    return 3;
  };

  // Calcular el total de páginas basado en los elementos a mostrar
  const mostrarVerMas = uniforms.length > 10;
  const itemsParaMostrar = mostrarVerMas ? uniforms.slice(0, 9) : uniforms;

  // Efecto para manejar el resize y calcular elementos por página
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = calculateItemsPerPage();
      setItemsPerPage(newItemsPerPage);
      setTotalPages(Math.ceil(itemsParaMostrar.length / newItemsPerPage));
      // Ajustar el índice actual si es necesario
      setCurrentIndex((prev) => {
        const newTotalPages = Math.ceil(
          itemsParaMostrar.length / newItemsPerPage
        );
        return prev >= newTotalPages ? 0 : prev;
      });
    };

    // Ejecutar al montar el componente
    handleResize();

    // Agregar listener para resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [itemsParaMostrar.length]);

  // Función para ir a la siguiente página
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  // Función para ir a la página anterior
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Verificar si hay elementos suficientes para mostrar flechas
  const showNavigation = itemsParaMostrar.length > itemsPerPage;

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      {/* Título */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#190E46]">
          Nuestros Uniformes
        </h2>
        <div className="text-center">
          <a
            href="/Categoria"
            className="inline-flex items-center gap-2 text-[#190E46] font-semibold rounded-lg px-3 py-2 hover:text-white hover:bg-indigo-800 transition-colors duration-200"
          >
            Ver mas
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Contenedor principal del slider */}
      <div className="relative">
        {/* Flecha izquierda - oculta en móvil */}
        {showNavigation && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 border hidden sm:block"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#190E46]" />
          </button>
        )}

        {/* Contenedor de elementos */}
        <div ref={containerRef} className="overflow-hidden mx-0 sm:mx-12">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {/* Renderizar solo los elementos necesarios */}
            {Array.from({ length: totalPages }).map((_, pageIndex) => (
              <div
                key={pageIndex}
                className="flex gap-3 sm:gap-5 flex-shrink-0 justify-center px-2 sm:px-0"
                style={{ width: "100%", minWidth: "100%" }}
              >
                {itemsParaMostrar
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  )
                  .map((uniform) => (
                    <div
                      key={uniform.id}
                      className="flex-shrink-0 w-full sm:w-auto sm:max-w-xs"
                      style={{
                        maxWidth:
                          itemsPerPage === 1
                            ? "100%"
                            : itemsPerPage === 2
                            ? "calc(50% - 0.375rem)"
                            : "320px",
                      }}
                    >
                      <UniformLib {...uniform} />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha - oculta en móvil */}
        {showNavigation && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 border hidden sm:block"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-[#190E46]" />
          </button>
        )}
      </div>

      {/* Indicadores de página (dots) */}
      {showNavigation && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex
                  ? "bg-[#190E46]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir a la página ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Navegación táctil para móviles */}
      {showNavigation && (
        <div className="flex justify-center mt-4 gap-4 sm:hidden">
          <button
            onClick={prevSlide}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors duration-200 border"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#190E46]" />
          </button>
          <button
            onClick={nextSlide}
            className="bg-white shadow-lg rounded-full p-3 hover:bg-gray-100 transition-colors duration-200 border"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-[#190E46]" />
          </button>
        </div>
      )}
    </div>
  );
};
