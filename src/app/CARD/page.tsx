"use client";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

interface Producto {
  id: number;
  descripcion: string;
  precio: number;
  cantidad: number;
  image: string;
}

export default function Cart() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [comentario, setComentario] = useState("");

  useEffect(() => {
    fetch("/data/uniformes-futbol.json")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  const actualizarCantidad = (id: number, delta: number) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, cantidad: Math.max(1, p.cantidad + delta) } : p
      )
    );
  };

  const eliminarProducto = (id: number) => {
    setProductos((prev) => prev.filter((p) => p.id !== id));
  };

  const subtotal = productos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  const envio = subtotal < 1000 ? 0 : 150;
  const total = subtotal + envio;

  return (
    <section className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl text-[#190E46] font-semibold">TU CARRITO</h1>
        <a href="/" className="text-sm text-[#190E46] font-semibold underline">
          SEGUIR COMPRANDO
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Lista de productos */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="flex gap-4 border rounded-lg p-4 items-start"
            >
              {/* Imagen placeholder */}
              <Image
                src={producto.image}
                alt={producto.descripcion}
                width={300}
                height={300}
                className="object-contain h-auto w-auto max-h-[220px] border-2 ml-7 rounded-2xl shadow-sm"
              />

              {/* Info producto */}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">
                  {producto.descripcion}
                </h3>

                <div className="flex items-center text-[#190E46] gap-2 mt-2">
                  <span className="text-sm">Cantidad:</span>
                  <button onClick={() => actualizarCantidad(producto.id, -1)}>
                    <Minus size={16} />
                  </button>
                  <span className="w-6 text-center">{producto.cantidad}</span>
                  <button onClick={() => actualizarCantidad(producto.id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>

                <div className="mt-2 flex items-center gap-4 text-sm">
                  <span className="font-semibold text-green-700">
                    ${producto.precio} MXN
                  </span>
                  <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="text-red-500 flex items-center gap-1"
                  >
                    <Trash2 size={14} /> Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del pedido */}
        <div className="border rounded-lg p-4 shadow-sm bg-gray-50">
          <h2 className="font-semibold bg-[#190E46] rounded-3xl py-2 px-4 mb-4">
            RESUMEN DEL PEDIDO:
          </h2>
          <div className="text-sm text-gray-700 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>${envio}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
          <a href="/Envio">
            <button className="mt-6 w-full bg-[#190E46] text-white rounded-full py-2 font-medium hover:bg-indigo-800">
              CONTINUAR
            </button>
          </a>
        </div>
      </div>

      {/* Comentario */}
      <div className="mt-6">
        <label className="block text-sm font-medium mb-2">
          Agregar un Comentario
        </label>
        <textarea
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="w-full border rounded-lg p-3"
          rows={4}
          placeholder="Comentarios adicionales sobre tu pedido..."
        />
      </div>
    </section>
  );
}
