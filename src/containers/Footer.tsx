"use client";
import { useEffect, useState } from "react";
import AssetKingo from "../../public/LOGO-KINGO.png";
import Image from "next/image";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";

export default function Footer() {
  const [año, setAño] = useState<number | null>(null);

  useEffect(() => {
    const year = new Date().getFullYear();
    setAño(year);
  }, []);

  return (
    <footer className="  px-1 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 px-7 py-5 gap-4">
        {/* Teléfono */}
        <div className="flex flex-col text-white ">
          <Image src={AssetKingo} alt="Kingo Sport" width={320} height={120} />
          <div className="flex md:justify-center items-center gap-4">
            <FaFacebookSquare className="w-10 h-10 rounded-md hover:text-orange bg-gray-600 cursor-pointer" />
            <FaSquareXTwitter className="w-10 h-10 rounded-md hover:text-orange bg-gray-600 cursor-pointer" />
            <FaSquareInstagram className="w-10 h-10 rounded-md hover:text-orange bg-gray-600 cursor-pointer" />
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-col gap-3 text-sm text-[#190E46] font-sans font-medium">
          <ul className="space-y-2">
            <h1 className="font-extrabold text-xl">CONTACTO</h1>
            <li>Calle Mariano Silva y Aceves #200</li>
            <li>Colonia Centro, La Piedad Michoacan</li>
            <li>C.P. 59300. Mexico</li>
            <li>TEL: (352) 155-6481 | (352) 000-0000</li>
            <li>Correo: ventaskingosport@gmail.com</li>
            <li>Horario: Lunes - Sábado de 10:00 a 19:00</li>
          </ul>
        </div>
        {/*Privacidad */}
        <div className="flex flex-col gap-3 text-sm not-last-of-type:text-[#190E46] font-sans font-medium">
          <ul className="space-y-2">
            <h1 className="font-extrabold text-xl">POLITICAS LEGALES</h1>
            <li>Terminos y condiciones</li>
            <li>Avisos de privacidad</li>
            <li>Politicas de Garantia</li>
            <li>Politicas de Ventas</li>
          </ul>
        </div>
        {/*Contacto*/}

        <div className="flex flex-col gap-3 text-sm text-[#190E46] font-sans font-medium">
          <ul className="space-y-2">
            <h1 className="font-extrabold text-xl">ACLARACION</h1>
            <p>
              Todos los precios están expresados en pesos mexicanos (MXN). Lás
              imagenes utilizadas dentro del sitio son expresadas como
              referencia por lo que puede existir variaciones en los productos
              vendidos.
            </p>
          </ul>
        </div>
      </div>
      <hr className="border-[1px] border-gray-500 " />
      <div className="flex flex-row justify-between text-xs text-gray-400 mt-6">
        {" © "}
        {año} Enjo-it. Todos los derechos reservados.
      </div>
    </footer>
  );
}
