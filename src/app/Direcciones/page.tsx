"use client";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddressData } from "@/Types/uniforms";

const Addresses: React.FC = () => {
  const [direcciones, setdirecciones] = useState<AddressData[]>([]);
  const router = useRouter();

  const eliminarProducto = (id: number) => {
    setdirecciones((prev) => prev.filter((p) => p.id !== id));
  };

  const modificarDireccion = (direccion: AddressData) => {
    // Convertir el objeto a string para pasarlo como parámetro de URL
    const direccionString = encodeURIComponent(JSON.stringify(direccion));
    router.push(`/Nueva-Direccion?edit=${direccionString}`);
  };

  const handleUsar = (direccion: AddressData) => {
    // Convertir el objeto a string para pasarlo como parámetro de URL
    const direccionString = encodeURIComponent(JSON.stringify(direccion));
    router.push(`/Envio?edit=${direccionString}`);
  };

  useEffect(() => {
    fetch("/data/Direcciones.json")
      .then((res) => res.json())
      .then((data) => setdirecciones(data));
  }, []);

  return (
    <section className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
        <h1 className="text-2xl text-[#190E46] font-bold">
          Lista de direcciones
        </h1>
        <a
          href="/Nueva-Direccion"
          className="text-sm text-white px-2 py-1 rounded-2xl bg-[#190E46] font-semibold underline hover:text-indigo-900"
        >
          + Nueva Dirección
        </a>
      </div>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {direcciones.map((dire) => (
          <div
            key={dire.id}
            className="border rounded-2xl shadow-md p-6 bg-white text-[#190E46] flex flex-col justify-between"
          >
            {/* Header */}
            <div className="text-lg font-bold bg-[#190E46] text-white rounded-full py-1 px-4 w-fit mb-4">
              <h1>{dire.nombre}</h1>
            </div>
            {/* Dirección */}
            <div className="space-y-1 text-sm font-medium">
              <div className="flex justify-between">
                <span>
                  {dire.direccion} #{dire.numero}
                </span>
                <span>{dire.cp}</span>
              </div>
              <div>
                {dire.ciudad}, {dire.estado}
              </div>
              <div className="text-gray-500">{dire.referencia}</div>
            </div>
            {/* Acciones */}
            <div className="flex justify-between items-center mt-5">
              <button
                onClick={() => handleUsar(dire)}
                className="bg-[#190E46] text-white text-sm px-4 py-2 rounded-full hover:bg-indigo-800"
              >
                Usar
              </button>{" "}
              <button
                onClick={() => eliminarProducto(dire.id!)}
                className="text-red-600 hover:underline flex items-center gap-1 text-sm"
              >
                <Trash2 size={16} /> Eliminar
              </button>
              <button
                onClick={() => modificarDireccion(dire)}
                className="bg-[#190E46] text-white text-sm px-4 py-2 rounded-full hover:bg-indigo-800"
              >
                Modificar
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Addresses;
