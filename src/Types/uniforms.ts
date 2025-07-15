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

export interface AddressData {
  id?: number;
  nombre: string;
  direccion: string;
  numero: number;
  referencia: string;
  municipio: string;
  curp: string;
  correo: string;
  telefono: number;
  colonia: string;
  ciudad: string;
  estado: string;
  cp: number;
}

export interface Producto {
  id: number;
  equipo: string;
  precio: number;
  cantidad: number;
}

export interface ResumenPedido {
  productos: Producto[];
  equipo: string;
  subtotal: number;
  envio: number;
  total: number;
  comentario: string;
  direccion?: AddressData;
}
