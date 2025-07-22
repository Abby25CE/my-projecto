"use client";

import Image from "next/image";

export default function Pay() {
  return (
    <div className="w-full bg-white pt-4 border-t  border-gray-200">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between text-sm text-[#190E46] font-semibold">
        <span className="mb-2 sm:mb-0">FORMAS DE PAGO</span>
        <div className="flex items-center justify-between gap-16">
          <Image
            src="/Visa.png"
            alt="Visa"
            width={50}
            height={30}
            className="object-contain"
          />
          <Image
            src="/mastercard.png"
            alt="MasterCard"
            width={50}
            height={30}
            className="object-contain"
          />
          <Image
            src="/american-express.png"
            alt="American Express"
            width={50}
            height={30}
            className="object-contain"
          />
          <Image
            src="/Paypal.png"
            alt="PayPal"
            width={50}
            height={30}
            className="object-contain"
          />
        </div>
        <div className="text-right text-sm text-[#190E46]">
          <p className="font-semibold">COMPRAS Y ENTREGAS</p>
          <p className="text-xs">100% SEGURAS</p>
        </div>
      </div>
    </div>
  );
}
