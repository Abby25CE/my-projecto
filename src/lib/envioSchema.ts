import { z } from "zod";

export const envioSchema = z.object({
  nombre: z.string().min(1, "El nombre es requerido"),
  curp: z.string().min(10, "CURP inválido"),
  correo: z.string().email("Correo inválido"),
  telefono: z.string().min(10, "Teléfono inválido"),
  calle: z.string().min(1, "Calle requerida"),
  numero: z.string().min(1, "Número requerido"),
  cp: z.string().min(5, "C.P. inválido"),
  colonia: z.string().min(1, "Colonia requerida"),
  municipio: z.string().min(1, "Municipio requerido"),
  ciudad: z.string().min(1, "Ciudad requerida"),
  estado: z.string().min(1, "Estado requerido"),
});
