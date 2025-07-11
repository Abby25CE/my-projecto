"use client";
import { Carrusel } from "@/containers/Carrusel";
import CategoryFilters from "@/containers/Category";
import ProductCard from "@/containers/ProductCard";
import { UniformCarousel } from "@/containers/UniformCarousel";
import data from "../../public/data/uniformes-futbol.json";

export default function Home() {
  return (
    <div className="pb-10">
      <Carrusel />
      <ProductCard
        title="Kingo Sport CONJUNTO de Futbol Wolverhamton Visita 21-22"
        description="MATERIAL FUNCIONAL --- Hecho de 100 polyester poliéster respetuoso con la piel con impresión por sublimación que nunca se desvanece. El sudor no se acumulará debajo de la camisa, sin sensación de picazón y pegajosidad."
        imageUrl="/Sport.png"
        isNew={true}
      />
      <CategoryFilters />
      <UniformCarousel uniforms={data} />
      <UniformCarousel uniforms={data} />
    </div>
  );
}
