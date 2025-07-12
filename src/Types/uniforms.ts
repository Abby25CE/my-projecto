export interface UniformProps {
  id: number;
  codigo: string;
  sku: string;
  slug: string;
  categoria: string;
  equipo: string;
  descripcion: string;
  precio: number;
  moneda: string;
  genero: string;
  nombreSubCategoria: string;
  cantidad: number;
  image: string;
  images: string[];
  specifications: {
    material: string;
    sizes: string[];
    features: string[];
    colors: string;
  };
}
