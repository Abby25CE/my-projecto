"use client";
import { Input } from "antd";
import { FC, useState } from "react";
import { ShoppingCart, Menu } from "lucide-react";
import Image from "next/image";
import AssetKingo from "../../public/LOGO-KINGO.png";
import { FaRegHeart } from "react-icons/fa";

const Navbar: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full border-b bg-white shadow-sm">
      {/* Top mini-bar */}
      <div className="hidden sm:flex justify-end text-sm px-4 py-1 space-x-4 text-gray-600">
        <a href="/Seguimiento" className="hover:underline">
          Seguimiento de pedidos
        </a>
        <a href="Login" className="hover:underline font-semibold text-blue-900">
          Iniciar sesión
        </a>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a href="/">
            <Image src={AssetKingo} alt="Kingo Sport" width={160} height={60} />
          </a>

          {/* Hamburger menu for mobile */}
          <button
            className=" sm:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex gap-5 md:hidden">
            <a href="/Carrito">
              <ShoppingCart className="w-6 h-6 text-gray-800" />
            </a>
            <a href="/WHISH-LIST">
              <FaRegHeart className="w-6 h-6 text-gray-800" />
            </a>
          </div>
        </div>

        {/* Links + Search + Cart */}
        <div className="hidden sm:flex items-center gap-10 w-full justify-end">
          {/* Navigation Links */}
          <nav className="hidden md:flex gap-4 text-sm text-gray-700">
            <a href="/" className="hover:font-semibold px-2">
              Inicio
            </a>
            <a href="/Categoria" className="hover:font-semibold px-2">
              Categorías
            </a>
            <a href="#" className="hover:font-semibold px-2">
              Hombre
            </a>
            <a href="#" className="hover:font-semibold px-2">
              Mujer
            </a>
            <a href="#" className="hover:font-semibold px-2">
              Guía de Tallas
            </a>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-4">
            <Input.Search
              placeholder="Buscar"
              className="rounded-lg text-sm max-w-[180px]"
            />
            <div className="relative">
              <a href="/Carrito" className="hover:underline">
                <ShoppingCart className="w-7 h-7 text-gray-800" />
                <span className="absolute -top-2 -right-2 bg-indigo-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  6
                </span>
              </a>
            </div>
            <div className="relative">
              <a href="/WHISH-LIST" className="hover:underline">
                <FaRegHeart className="w-6 h-6 text-gray-800" />
                <span className="absolute -top-2 -right-2 bg-indigo-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  1
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sm:hidden px-4 pb-4 space-y-3 text-gray-700 text-sm">
          <nav className="flex flex-col gap-2">
            <a href="/" className="hover:font-semibold">
              Inicio
            </a>
            <a href="/Categoria" className="hover:font-semibold">
              Categorías
            </a>
            <a href="#" className="hover:font-semibold">
              Hombre
            </a>
            <a href="#" className="hover:font-semibold">
              Mujer
            </a>
            <a href="#" className="hover:font-semibold">
              Guía de Tallas
            </a>
          </nav>
          <div className="flex flex-col gap-2">
            <Input.Search placeholder="Buscar" className="rounded-lg text-sm" />
            <a href="#" className="hover:underline text-blue-900 font-medium">
              Iniciar sesión
            </a>
            <a href="#" className="hover:underline">
              Seguimiento de pedidos
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
