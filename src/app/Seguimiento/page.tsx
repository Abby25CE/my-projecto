"use client";
import React from "react";

const SeguimientoPedido = () => {
  return (
    <section className="max-w-6xl mx-auto p-6 font-sans text-sm text-neutral-900">
      <h1 className="text-xl font-bold mb-4">SEGUIMIENTO DE PEDIDO</h1>

      {/* Encabezado */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div>
          <p className="text-gray-500">Transacción</p>
          <p className="font-semibold">#Transaccion_number</p>
        </div>
        <div>
          <p className="text-gray-500">Fecha del pedido</p>
          <p className="font-semibold">Date_Created</p>
        </div>
        <div>
          <p className="text-gray-500">Productos</p>
          <p className="font-semibold">Total_Materiales</p>
        </div>
        <div>
          <p className="text-gray-500">Total</p>
          <p className="font-semibold">Order_Amount</p>
        </div>
      </div>

      {/* Progreso del pedido */}
      <div className="flex justify-start items-center gap-6 mb-8">
        {[1, 2, 3].map((step, idx) => (
          <div
            key={idx}
            className={`rounded-full w-8 h-8 flex items-center justify-center font-bold ${
              idx === 0 ? "bg-[#190E46] text-white" : "bg-gray-200 text-black"
            }`}
          >
            {step}
          </div>
        ))}
        <p className="text-sm text-[#190E46]">Estatus: status_order</p>
      </div>

      {/* Entrega */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2">ENTREGA</h2>
        <p className="text-gray-500 mb-4">status_order</p>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center border-b py-4"
          >
            {/* Imagen */}
            <div className="col-span-1">
              <div className="w-24 h-24 bg-gray-100 border border-dashed flex items-center justify-center text-xs text-gray-400">
                Imagen
              </div>
            </div>

            {/* Info */}
            <div className="md:col-span-2">
              <p className="font-semibold">descripcionCorta</p>
              <p className="text-xs text-gray-500">codigoSKU</p>
              <p className="text-xs text-gray-500">Unidad de Medida</p>
            </div>

            {/* Precio */}
            <div className="md:col-span-1 font-medium">UnitPrice</div>

            {/* Cantidad */}
            <div className="md:col-span-1 font-medium">Quantity</div>
          </div>
        ))}
      </div>

      {/* Datos del pedido */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div>
          <h3 className="font-semibold mb-2">DATOS DEL PEDIDO</h3>
          <p className="text-gray-500">DIRECCIÓN DE ENVÍO</p>
          <p className="mb-2">shipping_address</p>

          <p className="text-gray-500">TELÉFONO</p>
          <p className="mb-2">telefono_contacto</p>

          <p className="text-gray-500">CORREO ELECTRÓNICO</p>
          <p>email_contact</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 invisible md:visible">&nbsp;</h3>
          <p className="text-gray-500">DIRECCIÓN DE FACTURACIÓN</p>
          <p>address_bill</p>
        </div>
      </div>

      {/* Información de pago */}
      <div>
        <h3 className="font-semibold mb-4">INFORMACIÓN DE PAGO</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Método de pago */}
          <div>
            <p className="text-gray-500">FORMA DE ENVÍO</p>
            <p className="mb-2">shipping_method</p>
          </div>

          {/* Resumen */}
          <div className="bg-gray-100 p-4 rounded">
            <p className="text-gray-500">RESUMEN DEL PEDIDO</p>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>$subtotal_amount</span>
            </div>
            <div className="flex justify-between">
              <span>Envío</span>
              <span>$shipping_tax</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>$order_amount</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeguimientoPedido;
