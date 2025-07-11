"use client";
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageUrl,
  isNew = false,
}) => {
  return (
    <div className="flex flex-col md:flex-row m-auto gap-4 items-start bg-white border rounded-2xl py-7 px-3 w-full max-w-3/4 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
      {/* Imagen + etiqueta NUEVO */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center">
        {isNew && (
          <span className="absolute top-2 left-2 bg-cyan-500 text-white text-xs font-semibold px-2 py-1 rounded z-10">
            NUEVO
          </span>
        )}
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={300}
          className="object-contain h-auto w-auto max-h-[220px] border-2 ml-7 rounded-2xl shadow-sm"
        />
      </div>

      {/* Texto y botón */}
      <div className="flex flex-col justify-between w-full md:w-1/2 text-left">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-900">
            {title}
          </h3>
          <p className="text-sm md:text-base text-gray-700 mt-2">
            {description}
          </p>
        </div>

        <button
          className="mt-4 md:mt-6 self-start bg-[#190E46] text-white px-6 py-2 rounded-full text-sm hover:bg-indigo-800 transition"
          onClick={(e) => {
            e.stopPropagation(); // Prevenir que se ejecute el click del contenedor
          }}
        >
          Vista rápida
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
