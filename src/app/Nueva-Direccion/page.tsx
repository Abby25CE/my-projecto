"use client";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

export default function NuevaDireccion() {
  const [direccionPrincipal, setDireccionPrincipal] = useState(false);

  return (
    <section className="max-w-2xl ml-2 md:ml-10 p-6 text-[#190E46]">
      <h1 className="text-2xl font-semibold  mb-1">Nueva Dirección</h1>
      <p className="text-gray-600 mb-6">
        Por favor, introduce la información de la dirección.
      </p>

      <form className="space-y-5">
        {/* Nombre dirección */}
        <div>
          <label className="block font-medium mb-1">
            Nombre de la dirección
          </label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Ej. Almacén central, Almacén zona Z..."
          />
        </div>

        {/* País y Código Postal */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">
              *Seleccione un país
            </label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Selecciona...</option>
              <option>México</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">*Código Postal</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Calle */}
        <div>
          <label className="block font-medium mb-1">*Calle</label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Números */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">*Número Exterior</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">Número Interior</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Referencia adicional */}
        <div>
          <label className="block font-medium mb-1">
            Entre la calle y la calle o información adicional
          </label>
          <input type="text" className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Colonia, Delegación */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">*Colonia</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              *Delegación o Municipio
            </label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
        </div>

        {/* Ciudad, Estado */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">*Ciudad</label>
            <input type="text" className="w-full border rounded-lg px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium mb-1">
              *Seleccione un estado
            </label>
            <select className="w-full border rounded-lg px-3 py-2">
              <option>Selecciona...</option>
              <option>Michoacán</option>
              <option>CDMX</option>
              <option>Jalisco</option>
            </select>
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block font-medium mb-1">
            *Teléfono de contacto
          </label>
          <input type="tel" className="w-full border rounded-lg px-3 py-2" />
        </div>

        {/* Checkbox dirección principal */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={direccionPrincipal}
            onChange={() => setDireccionPrincipal(!direccionPrincipal)}
            className="accent-[#190E46]"
          />
          <label>Definir como dirección Principal</label>
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#190E46] text-white px-6 py-2 rounded-full hover:bg-indigo-900"
          >
            Guardar Dirección <ArrowRight size={18} />
          </button>

          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-[#190E46] text-[#190E46] px-6 py-2 rounded-full hover:bg-gray-100"
          >
            Cancelar <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
