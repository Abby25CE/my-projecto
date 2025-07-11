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
  const containerRef = useRef<HTMLDivElement>(null);

  // Número de elementos a mostrar por página (responsive)
  const itemsPerPage = 3;

  // Calcular el total de páginas basado en los elementos a mostrar
  const mostrarVerMas = uniforms.length > 10;
  const itemsParaMostrar = mostrarVerMas ? uniforms.slice(0, 9) : uniforms;

  useEffect(() => {
    setTotalPages(Math.ceil(itemsParaMostrar.length / itemsPerPage));
  }, []);

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
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold text-[#190E46] mb-6 text-start">
          Nuestros Uniformes
        </h2>
        <div className="text-center ">
          <a
            href="/Categoria"
            className="inline-flex items-center gap-2 text-[#190E46] font-semibold mt-5 rounded-lg hover:bg-indigo-800 transition-colors duration-200 "
          >
            Ver mas
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Contenedor principal del slider */}
      <div className="relative">
        {/* Flecha izquierda */}
        {showNavigation && (
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 border"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-[#190E46]" />
          </button>
        )}

        {/* Contenedor de elementos */}
        <div ref={containerRef} className="overflow-hidden ">
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
                className="flex gap-5 flex-shrink-0 justify-center"
                style={{ width: "100%", minWidth: "100%" }}
              >
                {itemsParaMostrar
                  .slice(
                    pageIndex * itemsPerPage,
                    (pageIndex + 1) * itemsPerPage
                  )
                  .map((uniform) => (
                    <div key={uniform.id} className="flex-shrink-0 max-w-xs">
                      <UniformLib {...uniform} />
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Flecha derecha */}
        {showNavigation && (
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors duration-200 border"
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
    </div>
  );
};
