"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UniformProps } from "../Types/uniforms";

const UniformLib: React.FC<UniformProps> = ({
  id,
  slug,
  categoria,
  descripcion,
  precio,
  image,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/Producto/${slug}`);
  };

  const handleComprar = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push(`/Producto/${slug}`);
  };

  return (
    <div
      key={id}
      className="border rounded-lg shadow-md p-3 sm:p-4 bg-white w-full h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      {/* Contenedor de imagen responsive */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 mb-3 sm:mb-4">
        <Image
          src={image}
          alt={descripcion}
          fill
          className="object-contain rounded-lg border-2 shadow-sm"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[#190E46] font-bold text-base sm:text-lg mb-2 line-clamp-1">
          {categoria}
        </h3>

        <p className="text-gray-700 text-sm mb-3 sm:mb-4 flex-1 line-clamp-2">
          {descripcion}
        </p>

        {/* Footer de la tarjeta */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-auto">
          <span className="text-green-700 font-semibold text-sm sm:text-base">
            ${precio} MXN
          </span>

          <button
            className="bg-[#190E46] text-white px-3 sm:px-4 py-2 rounded-3xl hover:bg-indigo-800 text-sm transition-colors duration-200 w-full sm:w-auto"
            onClick={handleComprar}
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UniformLib;
