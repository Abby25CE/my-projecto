"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AddressData } from "@/Types/uniforms";

export default function NuevoDiseno() {
  return (
    <section className="max-w-2xl ml-2 md:ml-10 p-6 text-[#190E46]">
      <h1 className="text-2xl font-semibold mb-1"></h1>
      <p className="text-gray-600 mb-6">
        Por favor, introduce la información del diseño a realizar
      </p>

      <form className="space-y-5">
        {/* Nombre dirección */}
        <div>
          <label className="block font-medium mb-1">Nombre del Equipo</label>
          <input
            type="text"
            name="nombre"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* País y Código Postal */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Posicion</label>
            <input
              type="text"
              name="cp"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Numeracion</label>
            <input
              type="text"
              name="cp"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Ciudad, Estado */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Accesorios Extra </label>
            <input
              type="text"
              name="colonia"
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tipo de cuello</label>
            <select
              name="estado"
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Selecciona...</option>
              <option>Cuello V</option>
              <option>Cuello U</option>
              <option>Tipo Polo </option>
            </select>
          </div>
        </div>
        <div>
          <label className="block font-medium mb-1">Cuentanos tus ideas</label>
          <input
            type="text"
            name="nombre"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
        {/* Teléfono */}
        <div>
          <label className="block font-medium mb-1">Envia tu boseto</label>
          <input
            id="picture"
            type="file"
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-[#190E46] text-white px-6 py-2 rounded-full hover:bg-indigo-900"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
