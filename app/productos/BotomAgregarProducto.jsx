import React from 'react'
import Link from "next/link";

const BotomAgregarProducto = () => {
  return (
    
    <Link href="/productos/agregar" 
    className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-500 "
    >Agregar nuevo productos</Link>
    
  )
}

export default BotomAgregarProducto
