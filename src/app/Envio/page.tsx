"use client";
import { useState } from "react";
import data from "../../../public/data/Direcciones.json";

const EnvioFormulario = () => {
  const [comentario, setComentario] = useState("");
  const [step, setStep] = useState(1);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("opcion1");

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const direccionId = 10;

  // Filtrar solo la dirección con id = 2
  const direccion = data.find((dir) => dir.id === direccionId);

  if (!direccion) {
    return <p className="text-red-500">Dirección no encontrada.</p>;
  }

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
                  placeholder="Nombre"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="text"
                  placeholder="RFC"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="tel"
                  placeholder="Teléfono"
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
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <div className="flex gap-5">
                  <input
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
                    type="text"
                    placeholder="Código Postal"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Colonia / Delegación"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                <input
                  type="text"
                  placeholder="Ciudad / Estado"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />

                <input
                  type="text"
                  placeholder="Nombre de la dirección (ej. Casa)"
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

          <div className="text-sm text-gray-700 space-y-1 mb-3">
            <div className="flex justify-between">
              <span>Producto 1</span>
              <span>$100</span>
            </div>
            <div className="flex justify-between">
              <span>Producto 2</span>
              <span>$200</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>$300</span>
            </div>
          </div>

          {step === 1 && (
            <textarea
              placeholder="Agregar un Comentario"
              className="w-full p-2 border rounded resize-none"
              rows={4}
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          )}
          {step >= 2 && (
            <div className="space-y-3.5">
              <div className="bg-white p-4 rounded-t-xl border h-fit">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  📦 Detalles del envío
                </h3>

                <div className="space-y-2">
                  <div>
                    <span className="font-medium text-gray-600">Nombre:</span>
                    {direccion.nombre}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">
                      Dirección:
                    </span>
                    {direccion.direccion}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Número:</span>
                    {direccion.numero}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Ciudad:</span>
                    {direccion.ciudad}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Estado:</span>
                    {direccion.estado}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">C.P.:</span>
                    {direccion.cp}
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 rounded-b-xl border h-fit">
                <h3 className="text-lg font-bold mb-4 border-b pb-2">
                  📦 Detalles de la paqueteria
                </h3>
                Tipo de Envio: Express
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EnvioFormulario;
