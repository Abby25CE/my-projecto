// app/Producto/[slug]/page.tsx
"use client";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import Image from "next/image";
import data from "../../../../public/data/uniformes-futbol.json";
import { UniformCarousel } from "@/containers/UniformCarousel";

const Producto = () => {
  const params = useParams();
  const { slug } = params;

  const producto = data.find((item) => item.slug === slug);

  if (!producto) return notFound();

  return (
    <>
      <div className="max-w-6xl mx-auto p-6 font-sans text-sm text-neutral-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Galería */}
          <div className="bg-gray-100 p-4 relative rounded-lg shadow-sm">
            <div className="space-y-2">
              <Image
                src={producto.image}
                alt={producto.descripcion}
                width={250}
                height={250}
                className="rounded-lg w-full object-cover"
              />
              <div className="flex gap-2">
                {producto.images.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt={`miniatura ${i + 1}`}
                    width={100}
                    height={100}
                    className="rounded-md border"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4 text-[#190E46]">
            <div className="text-xs text-gray-500">
              {producto.nombreSubCategoria}
            </div>
            <h2 className="text-2xl font-bold">{producto.equipo}</h2>
            <div className="text-xs text-gray-500">Código: {producto.sku}</div>

            <div className="flex items-center gap-4">
              <div className="text-xl font-bold">
                ${producto.precio.toLocaleString()} {producto.moneda}
              </div>
              <div className="text-sm text-gray-700">
                Por {producto.cantidad}
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <input
                type="number"
                min={1}
                defaultValue={1}
                className="border px-2 py-1 w-24 rounded"
              />
              <div className="flex gap-10">
                <button className="bg-[#190E46] text-white px-6 py-2 rounded-full hover:bg-indigo-800 text-sm">
                  Añadir al Carrito
                </button>
                <button className="border border-gray-400 px-4 py-2 rounded-full text-sm flex items-center justify-center gap-2">
                  ❤
                </button>
              </div>
            </div>

            <div className="border border-dashed p-4 mt-4 rounded text-gray-700">
              <h4 className="font-semibold mb-2 text-[#190E46]">
                Descripción del Producto
              </h4>
              <p>{producto.descripcion}</p>
            </div>
          </div>
        </div>

        <div className="border border-dashed p-4 mt-8 rounded text-gray-700">
          <h3 className="font-semibold mb-2 text-[#190E46]">
            Especificaciones Técnicas
          </h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>{producto.specifications.colors}</li>
            <li>{producto.specifications.material}</li>
            <li>{producto.specifications.features}</li>
          </ul>
        </div>
      </div>
      <UniformCarousel uniforms={data} />
    </>
  );
};

export default Producto;
