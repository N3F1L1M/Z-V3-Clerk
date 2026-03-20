"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Home, Box, Settings, Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside
      className={`
        ${isOpen ? "w-64" : "w-16"}
        h-dvh sticky top-0
        bg-gradient-to-r from-[#172785] to-[#f02323] text-white
        transition-all duration-300
        shadow-lg flex flex-col
      `}
    >
      {/* Botón */}
      <div className="flex justify p-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/90 text-emerald-900 hover:bg-white/70 p-2 rounded-lg transition"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Contenido */}
      <div className="flex-1 px-2">
        {isOpen && (
          <h2 className="text-lg font-semibold text-gray-300 px-3 mb-4">
            Menú
          </h2>
        )}

        <nav className="space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <Home size={20} />
            {isOpen && <span>Inicio</span>}
          </Link>

          <Link
            href="/productos"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <Box size={20} />
            {isOpen && <span>Productos</span>}
          </Link>

          <Link
            href="/contacto"
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition"
          >
            <Settings size={20} />
            {isOpen && <span>Servicios</span>}
          </Link>
        </nav>
      </div>

      {/* Footer opcional */}
      {isOpen && (
        <div className="p-4 text-xs text-gray-500">
          © 2026 Zcatalogo
        </div>
      )}
    </aside>
  );
}