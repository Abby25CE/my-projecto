"use client";
import Image from "next/image";
import { UniformProps } from "../Types/uniforms"; // Asegúrate de importar el tipo correct

const UniformLib: React.FC<UniformProps> = ({
  id,
  categoria,
  descripcion,
  precio,
  image,
}) => {
  return (
    <div
      key={id}
      className="border rounded-lg shadow-md p-4 bg-white w-full max-w-xs flex-shrink-0"
    >
      <Image
        src={image}
        alt={descripcion}
        width={300}
        height={300}
        className="object-contain h-auto w-auto max-h-[220px] border-2 rounded-2xl shadow-sm mx-auto"
      />
      <h3 className="text-[#190E46] font-bold text-lg mb-2 mt-4">
        {categoria}
      </h3>
      <p className="text-gray-700 text-sm mb-4">{descripcion}</p>
      <div className="flex justify-between items-center">
        <span className="text-green-700 font-semibold">${precio} MXN</span>
        <button className="bg-[#190E46] text-white px-4 py-2 rounded hover:bg-indigo-800 text-sm">
          Comprar
        </button>
      </div>
    </div>
  );
};

export default UniformLib;
