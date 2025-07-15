"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AddressData } from "@/Types/uniforms";

export default function NuevaDireccion() {
  const [direccionPrincipal, setDireccionPrincipal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    pais: "México",
    cp: "",
    calle: "",
    numeroExterior: "",
    numeroInterior: "",
    referencia: "",
    colonia: "",
    delegacion: "",
    ciudad: "",
    estado: "",
    telefono: "",
  });

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const editParam = searchParams.get("edit");
    if (editParam) {
      try {
        const direccionData: AddressData = JSON.parse(
          decodeURIComponent(editParam)
        );
        setIsEditing(true);
        setFormData({
          nombre: direccionData.nombre || "",
          pais: "México",
          cp: direccionData.cp?.toString() || "",
          calle: direccionData.direccion || "",
          numeroExterior: direccionData.numero?.toString() || "",
          numeroInterior: "",
          referencia: direccionData.referencia || "",
          colonia: direccionData.colonia || "",
          delegacion: direccionData.municipio || "",
          ciudad: direccionData.ciudad || "",
          estado: direccionData.estado || "",
          telefono: "",
        });
      } catch (error) {
        console.error("Error al parsear los datos de edición:", error);
      }
    }
  }, [searchParams]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar o actualizar la dirección
    console.log("Datos del formulario:", formData);
    console.log("Es edición:", isEditing);

    // Redireccionar de vuelta a la lista
    router.push("/direcciones");
  };

  const handleCancel = () => {
    router.push("/direcciones");
  };

  return (
    <section className="max-w-2xl ml-2 md:ml-10 p-6 text-[#190E46]">
      <h1 className="text-2xl font-semibold mb-1">
        {isEditing ? "Editar Dirección" : "Nueva Dirección"}
      </h1>
      <p className="text-gray-600 mb-6">
        Por favor, introduce la información de la dirección.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre dirección */}
        <div>
          <label className="block font-medium mb-1">
            Nombre de la dirección
          </label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
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
            <select
              name="pais"
              value={formData.pais}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>Selecciona...</option>
              <option>México</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">*Código Postal</label>
            <input
              type="text"
              name="cp"
              value={formData.cp}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Calle */}
        <div>
          <label className="block font-medium mb-1">*Calle</label>
          <input
            type="text"
            name="calle"
            value={formData.calle}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Números */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">*Número Exterior</label>
            <input
              type="text"
              name="numeroExterior"
              value={formData.numeroExterior}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Número Interior</label>
            <input
              type="text"
              name="numeroInterior"
              value={formData.numeroInterior}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Referencia adicional */}
        <div>
          <label className="block font-medium mb-1">
            Entre la calle y la calle o información adicional
          </label>
          <input
            type="text"
            name="referencia"
            value={formData.referencia}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Colonia, Delegación */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">*Colonia</label>
            <input
              type="text"
              name="colonia"
              value={formData.colonia}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              *Delegación o Municipio
            </label>
            <input
              type="text"
              name="delegacion"
              value={formData.delegacion}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Ciudad, Estado */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">*Ciudad</label>
            <input
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              *Seleccione un estado
            </label>
            <select
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-3 py-2"
            >
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
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
            className="w-full border rounded-lg px-3 py-2"
          />
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
            {isEditing ? "Actualizar Dirección" : "Guardar Dirección"}{" "}
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="flex items-center justify-center gap-2 border border-[#190E46] text-[#190E46] px-6 py-2 rounded-full hover:bg-gray-100"
          >
            Cancelar <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </section>
  );
}
