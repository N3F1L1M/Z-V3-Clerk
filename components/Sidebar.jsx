"use client"

import Link from "next/link";
import React, { useState } from 'react'






export default function Sidevar() {


  const [isOpen, setIsOpen] = useState(true);

  return (


      <aside  className={`${ isOpen ? "w-64" : "w-12" } h-screen  sticky top-15
       bg-gray-800 text-white  transition-all duration-500`}>
          
        
      <button className = "bg-purple-800 text-white p-2 rounded-md shadow-md m-3"
                onClick = {() => setIsOpen(!isOpen)}>  {isOpen ? "X" : "☰"} </button>



        {isOpen && (

          <div className="m-4">
            <h2 className="text-xl font-bold">Menú</h2>

            <ul className="mt-4 space-y-2">
              <li><Link className="block p-2 hover:bg-gray-700" href="/">Inicio</Link></li>
              <li><Link className="block p-2 hover:bg-gray-700" href="/productos">Productos</Link></li>
              <li><Link className="block p-2 hover:bg-gray-700" href="/contacto">Servicios</Link></li>
            </ul>

          </div>
        )}


      </aside>
    
  );
};

