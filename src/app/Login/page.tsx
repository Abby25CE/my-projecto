"use client";

import { useState } from "react";
import { FaGoogle, FaFacebook, FaApple, FaMicrosoft } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    console.log("Login con", email, password);
    setError("");
  };

  return (
    <div className="min-w-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <div
        className="bg-white shadow-xl rounded-3xl w-full md:grid md:grid-cols-2
       md:max-w-9/12 space-y-4 gap-14 p-8 border border-gray-200"
      >
        <div>
          <h2 className="text-2xl font-bold text-center text-[#190E46] mb-6">
            Iniciar Sesión
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo electrónico
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#190E46] text-gray-700"
                placeholder="correo@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-gray-700 mt-1 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#190E46]"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#190E46] text-white font-semibold py-2 px-4 rounded-xl hover:bg-[#291F66] transition"
            >
              Ingresar
            </button>

            <div className="text-sm text-center text-gray-600">
              ¿No tienes cuenta?{" "}
              <a
                href="/registro"
                className="text-[#190E46] font-medium hover:underline"
              >
                Regístrate
              </a>
            </div>
          </form>
        </div>

        {/* Divider */}
        <div className="my-6 flex md:hidden items-center justify-center">
          <div className="border-t w-full border-gray-700"></div>
          <span className="px-3 text-gray-500 text-sm">o</span>
          <div className="border-t w-full border-gray-700"></div>
        </div>

        {/* Social Login */}
        <div className="justify-center gap-4 md:gap-7 flex flex-col text-gray-500">
          <button className="flex items-center justify-center w-full border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition">
            <FaGoogle className="mr-2 text-red-500" />
            Iniciar con Google
          </button>

          <button className="flex items-center justify-center w-full border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition">
            <FaMicrosoft className="mr-2 text-blue-700" />
            Iniciar con Outlook
          </button>

          <button className="flex items-center justify-center w-full border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition">
            <FaFacebook className="mr-2 text-blue-600" />
            Iniciar con Facebook
          </button>

          <button className="flex items-center justify-center w-full border border-gray-300 rounded-xl py-2 hover:bg-gray-100 transition">
            <FaApple className="mr-2 text-black" />
            Iniciar con Apple
          </button>
        </div>
      </div>
    </div>
  );
}
