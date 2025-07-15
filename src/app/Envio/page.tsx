"use client";
import { useEffect, useState } from "react";
import data from "../../../public/data/Direcciones.json";
import { useSearchParams } from "next/navigation";
import { AddressData, ResumenPedido } from "@/Types/uniforms";

const EnvioFormulario = () => {
  const [comentario, setComentario] = useState("");
  const [step, setStep] = useState(1);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("opcion1");
  const [resumen, setResumen] = useState<ResumenPedido | null>(null);
  const searchParams = useSearchParams();
  const [direcciones, setDirecciones] = useState<AddressData | null>(null);
  const [nombre, setNombre] = useState("");
  const [curp, setCurp] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [cp, setCp] = useState("");
  const [colonia, setColonia] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [estado, setEstado] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("resumenPedido");
    if (data) {
      const parsed = JSON.parse(data);
      setResumen(parsed);
      setComentario(parsed.comentario || "");
    }

    // Verificamos si hay una dirección pasada por query param
    const direccionEdit = searchParams.get("edit");
    if (direccionEdit) {
      try {
        const direccionDecodificada = JSON.parse(
          decodeURIComponent(direccionEdit)
        );
        setDirecciones(direccionDecodificada);
        // Precarga campos
        setNombre(direccionDecodificada.nombre || "");
        setCurp(direccionDecodificada.curp || "");
        setCorreo(direccionDecodificada.correo || "");
        setTelefono(direccionDecodificada.telefono || "");
        setCalle(direccionDecodificada.direccion || "");
        setNumero(direccionDecodificada.numero || "");
        setCp(direccionDecodificada.cp || "");
        setColonia(direccionDecodificada.colonia || "");
        setMunicipio(direccionDecodificada.municipio || "");
        setCiudad(direccionDecodificada.ciudad || "");
        setEstado(direccionDecodificada.estado || "");
      } catch (err) {
        console.error("Error al decodificar dirección:", err);
      }
    }
  }, []);

  if (!resumen) return null;

  const { productos, subtotal, envio, total } = resumen;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <section className="max-w-6xl mx-auto p-6">
      {/* Progreso de pasos */}
      <div className="flex justify-between items-center mb-8 border-b pb-2 text-sm text-gray-600 font-medium">
        {["1. ENVÍO", "2. PAGO", "3. PEDIDO REALIZADO"].map((label, index) => (
          <div
            key={index}
            className={`flex-1 text-center ${
              step === index + 1 ? "text-[#190E46]" : "text-gray-400"
            }`}
          >
            <div
              className={`border-b-4 ${
                step === index + 1 ? "border-[#190E46]" : "border-gray-300"
              } pb-1`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Contenido por paso */}
      <div className="grid md:grid-cols-3 gap-8 text-[#190E46]">
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">INFORMACIÓN DEL ENVÍO</h2>
              <a href="/Direcciones" className="underline">
                Mis direcciones
              </a>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="text"
                  placeholder="RFC/CURP"
                  value={curp}
                  onChange={(e) => setCurp(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="email"
                  value={correo}
                  placeholder="Email"
                  onChange={(e) => setCorreo(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="text"
                  placeholder="Información adicional"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700 col-span-2"
                />
              </div>

              <h2 className="text-lg font-semibold">DIRECCIÓN DE ENVÍO</h2>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Calle"
                  value={calle}
                  onChange={(e) => setCalle(e.target.value)}
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <div className="flex gap-5">
                  <input
                    onChange={(e) => setNumero(e.target.value)}
                    value={numero}
                    type="text"
                    placeholder="Número*"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Número interior"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  <input
                    value={cp}
                    onChange={(e) => setCp(e.target.value)}
                    type="text"
                    placeholder="Código Postal"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                </div>
                <div className="flex gap-5">
                  <input
                    type="text"
                    value={colonia}
                    onChange={(e) => setColonia(e.target.value)}
                    placeholder="Colonia"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  <input
                    type="text"
                    onChange={(e) => setMunicipio(e.target.value)}
                    value={municipio}
                    placeholder="Municipio"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                </div>
                <div className="flex gap-5">
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Estado"
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Referencia de la dirección (ej. Casa)"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
              </div>
            </>
          )}

          {step === 2 && (
            <div className="max-w-xl mx-auto p-6 text-sm font-sans text-neutral-900">
              <h2 className="text-lg font-semibold mb-4">MÉTODO DE PAGO</h2>

              <div className="space-y-4 border border-dashed p-4">
                <label className="block border border-neutral-300 p-4 rounded cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="opcion1"
                      className="accent-black"
                      checked={metodoSeleccionado === "opcion1"}
                      onChange={(e) => setMetodoSeleccionado(e.target.value)}
                    />
                    <span className="font-medium">Tarjeta de Crédito</span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-sm">
                    Paga con cualquier tarjeta de crédito o débito.
                  </p>
                </label>

                <label className="block border border-neutral-300 p-4 rounded cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="metodoPago"
                      value="opcion2"
                      className="accent-black"
                      checked={metodoSeleccionado === "opcion2"}
                      onChange={(e) => setMetodoSeleccionado(e.target.value)}
                    />
                    <span className="font-medium">Transferencia Bancaria</span>
                  </div>
                  <p className="text-neutral-500 mt-2 text-sm">
                    Te enviaremos los datos para que realices tu transferencia.
                  </p>
                </label>
              </div>

              <div className="mt-6 space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="accent-black" />
                  <span>
                    ACEPTO LOS{" "}
                    <a
                      href="#"
                      className="text-pink-600 underline font-semibold"
                    >
                      TÉRMINOS Y CONDICIONES DE COMPRA
                    </a>
                    .
                  </span>
                </label>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  Nosotros, [xxxxxxx], podremos comunicarnos con usted respecto
                  a productos de tienda...
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold mb-4">PEDIDO REALIZADO</h2>
              <p>Gracias por tu compra. Aquí va la confirmación del pedido.</p>
            </div>
          )}

          {/* Botones */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Anterior
              </button>
            )}
            {step < 3 && (
              <button
                onClick={nextStep}
                className="bg-[#190E46] text-white py-2 px-6 rounded hover:bg-indigo-800 ml-auto"
              >
                Continuar
              </button>
            )}
          </div>
        </div>

        {/* Resumen del pedido (siempre visible) */}
        <div className="bg-gray-100 p-4 rounded-lg border h-fit">
          <h3 className="bg-[#190E46] text-white font-bold w-full py-2 px-4 rounded-3xl mb-4 text-center">
            RESUMEN DEL PEDIDO
          </h3>

          {/* Productos */}
          <div className="text-sm text-gray-700 space-y-4 mb-3">
            {/* Subtotal y envío */}
            <div className="space-y-2"></div>

            {/* Productos */}
            <div className="space-y-2">
              {productos.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex flex-col">
                    <span className="font-medium text-[#190E46]">
                      {p.equipo}
                    </span>
                    <span className="text-xs text-gray-500">
                      Cantidad: {p.cantidad}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-green-700">
                    ${p.precio * p.cantidad}
                  </span>
                </div>
              ))}
            </div>

            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between items-center border-b pb-1">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-sm font-semibold text-green-700">
                ${subtotal}
              </span>
            </div>
            <div className="flex justify-between items-center border-b pb-1">
              <span className="text-gray-600">Envío</span>
              <span className="text-sm font-semibold text-blue-600">
                ${envio}
              </span>
            </div>
            {/* Total final */}
            <div className="flex justify-between font-semibold text-base text-[#190E46]">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>

          {/* Comentario solo en Step 1 */}
          {step === 1 && (
            <textarea
              placeholder="Agregar un Comentario"
              className="w-full p-2 border rounded resize-none"
              rows={4}
              value={comentario}
              onChange={(e) => {
                setComentario(e.target.value);
                // Actualizar localStorage también si deseas
                const actualizado = { ...resumen, comentario: e.target.value };
                setResumen(actualizado);
                localStorage.setItem(
                  "resumenPedido",
                  JSON.stringify(actualizado)
                );
              }}
            />
          )}

          {/* Dirección de Envío si ya está disponible */}
          {step >= 2 && (
            <div className="space-y-3.5">
              <div className="bg-white p-4 rounded-t-xl border h-fit">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  📦 Detalles del envío
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">Nombre: </span>
                    {nombre}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Dirección:{" "}
                    </span>
                    {calle} #{numero} {colonia}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Ciudad: </span>
                    {ciudad}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Municipio:{" "}
                    </span>
                    {municipio}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Estado: </span>
                    {estado}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">C.P.: </span>
                    {cp}
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-b-xl border h-fit">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  📦 Detalles de la paquetería
                </h3>
                Tipo de Envío: Express
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnvioFormulario;
