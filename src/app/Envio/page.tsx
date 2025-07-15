"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { envioSchema } from "@/lib/envioSchema";
import { z } from "zod";
import { ResumenPedido } from "@/Types/uniforms";

type EnvioFormData = z.infer<typeof envioSchema>;

const EnvioFormulario = () => {
  const [step, setStep] = useState(1);
  const [metodoSeleccionado, setMetodoSeleccionado] = useState("opcion1");
  const [resumen, setResumen] = useState<ResumenPedido | null>(null);
  const [comentario, setComentario] = useState("");

  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EnvioFormData>({
    resolver: zodResolver(envioSchema),
  });

  useEffect(() => {
    const stored = localStorage.getItem("resumenPedido");
    if (stored) {
      const parsed = JSON.parse(stored);
      setResumen(parsed);
      setComentario(parsed.comentario || "");
    }

    const direccionEdit = searchParams.get("edit");
    if (direccionEdit) {
      try {
        const dir = JSON.parse(decodeURIComponent(direccionEdit));
        Object.entries(dir).forEach(([key, val]) => {
          if (typeof val === "string") {
            setValue(key as keyof EnvioFormData, val);
          }
        });
      } catch (error) {
        console.error("Error al decodificar dirección:", error);
      }
    }
  }, [searchParams, setValue]);

  const nextStep = handleSubmit(() => setStep((s) => Math.min(s + 1, 3)));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  if (!resumen) return null;

  const { productos, subtotal, envio, total } = resumen;

  return (
    <section className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8 border-b pb-2 text-sm text-gray-600 font-medium">
        {["1. ENVÍO", "2. PAGO", "3. PEDIDO REALIZADO"].map((label, i) => (
          <div
            key={i}
            className={`flex-1 text-center ${
              step === i + 1 ? "text-[#190E46]" : "text-gray-400"
            }`}
          >
            <div
              className={`border-b-4 ${
                step === i + 1 ? "border-[#190E46]" : "border-gray-300"
              } pb-1`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit(() => setStep(2))}
        className="grid md:grid-cols-3 gap-8 text-[#190E46]"
      >
        <div className="md:col-span-2 space-y-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">INFORMACIÓN DEL ENVÍO</h2>
              <a href="/Direcciones" className="underline">
                Mis direcciones
              </a>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    {...register("nombre")}
                    placeholder="Nombre"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.nombre && (
                    <p className="text-red-500 text-sm">
                      {errors.nombre.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    {...register("curp")}
                    placeholder="CURP"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.curp && (
                    <p className="text-red-500 text-sm">
                      {errors.curp.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="email"
                    {...register("correo")}
                    placeholder="Email"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.correo && (
                    <p className="text-red-500 text-sm">
                      {errors.correo.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="tel"
                    {...register("telefono")}
                    placeholder="Teléfono"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.telefono && (
                    <p className="text-red-500 text-sm">
                      {errors.telefono.message}
                    </p>
                  )}
                </div>
              </div>

              <h2 className="text-lg font-semibold">DIRECCIÓN DE ENVÍO</h2>
              <div>
                <input
                  {...register("calle")}
                  placeholder="Calle"
                  className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                />
                {errors.calle && (
                  <p className="text-red-500 text-sm">{errors.calle.message}</p>
                )}
              </div>

              <div className="flex gap-4 ">
                <div className="w-1/3">
                  <input
                    {...register("numero")}
                    placeholder="Número"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.numero && (
                    <p className="text-red-500 text-sm">
                      {errors.numero.message}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    placeholder="Interior (opcional)"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                </div>

                <div className="w-1/3">
                  <input
                    {...register("cp")}
                    placeholder="Código Postal"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.cp && (
                    <p className="text-red-500 text-sm">{errors.cp.message}</p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-1/2">
                  <input
                    {...register("colonia")}
                    placeholder="Colonia"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.colonia && (
                    <p className="text-red-500 text-sm">
                      {errors.colonia.message}
                    </p>
                  )}
                </div>
                <div className="w-1/2">
                  <input
                    {...register("municipio")}
                    placeholder="Municipio"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.municipio && (
                    <p className="text-red-500 text-sm">
                      {errors.municipio.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col w-1/2">
                  <input
                    {...register("ciudad")}
                    placeholder="Ciudad"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.ciudad && (
                    <p className="text-red-500 text-sm">
                      {errors.ciudad.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col w-1/2">
                  <input
                    {...register("estado")}
                    placeholder="Estado"
                    className="w-full px-3 py-2 border rounded text-sm text-gray-700"
                  />
                  {errors.estado && (
                    <p className="text-red-500 text-sm">
                      {errors.estado.message}
                    </p>
                  )}
                </div>
              </div>

              <textarea
                placeholder="Agregar un Comentario"
                className="w-full p-2 border rounded resize-none"
                rows={4}
                value={comentario}
                onChange={(e) => {
                  setComentario(e.target.value);
                  const actualizado = {
                    ...resumen,
                    comentario: e.target.value,
                  };
                  setResumen(actualizado);
                  localStorage.setItem(
                    "resumenPedido",
                    JSON.stringify(actualizado)
                  );
                }}
              />
            </>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">MÉTODO DE PAGO</h2>
              <label className="block border p-4 rounded cursor-pointer">
                <input
                  type="radio"
                  value="opcion1"
                  checked={metodoSeleccionado === "opcion1"}
                  onChange={(e) => setMetodoSeleccionado(e.target.value)}
                  className="accent-black mr-2"
                />
                Tarjeta de Crédito
              </label>
              <label className="block border p-4 rounded cursor-pointer">
                <input
                  type="radio"
                  value="opcion2"
                  checked={metodoSeleccionado === "opcion2"}
                  onChange={(e) => setMetodoSeleccionado(e.target.value)}
                  className="accent-black mr-2"
                />
                Transferencia Bancaria
              </label>
              <label className="flex items-center gap-2 mt-4">
                <input type="checkbox" className="accent-black" />
                <span>
                  ACEPTO LOS{" "}
                  <a href="#" className="text-pink-600 underline font-semibold">
                    TÉRMINOS Y CONDICIONES DE COMPRA
                  </a>
                  .
                </span>
              </label>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold">PEDIDO REALIZADO</h2>
              <p>Gracias por tu compra. Aquí va la confirmación del pedido.</p>
            </div>
          )}

          {/* Botones */}
          <div className="mt-6 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              >
                Anterior
              </button>
            )}
            {step < 3 && (
              <button
                type="submit"
                className="bg-[#190E46] text-white py-2 px-6 rounded hover:bg-indigo-800 ml-auto"
              >
                Continuar
              </button>
            )}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="bg-gray-100 p-4 rounded-lg border h-fit">
          <h3 className="bg-[#190E46] text-white font-bold w-full py-2 px-4 rounded-3xl mb-4 text-center">
            RESUMEN DEL PEDIDO
          </h3>
          <div className="text-sm text-gray-700 space-y-4 mb-3">
            {productos.map((p) => (
              <div
                key={p.id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-[#190E46]">{p.equipo}</span>
                  <span className="text-xs text-gray-500">
                    Cantidad: {p.cantidad}
                  </span>
                </div>
                <span className="text-sm font-semibold text-green-700">
                  ${p.precio * p.cantidad}
                </span>
              </div>
            ))}

            <hr className="my-2 border-gray-300" />
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${envio}</span>
            </div>
            <div className="flex justify-between font-semibold text-base text-[#190E46]">
              <span>Total:</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EnvioFormulario;
