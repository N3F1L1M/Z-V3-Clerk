import React from 'react'

const Tablaproductos = ({ productos }) => {

    console.log(productos);
  return (
    <div className="overflow-x-auto p-5">
      <table className="w-full">
        <thead>
          <tr className="bg-[#ddc71b]">
            <th className="border border-black px-4 py-2">ID</th>
            <th className="border border-black px-4 py-2">Título</th>
            <th className="border border-black px-4 py-2">Precio</th>
            <th className="border border-black px-4 py-2">Foto Portada</th>
            <th className="border border-black px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>

          {productos.map((p) => (
            <tr key={p.id} className="border border-gray-300">
              <td className="border border-black px-4 py-2">{p.id}</td>
              <td className="border border-black px-4 py-2">{p.titulo}</td>
              <td className="border border-black px-4 py-2">${p.precio}</td>
              <td className="border border-black px-4 py-2">
                <img width="100" src={p.imagenes[0]} className="rounded"/>
              </td>
              <td className="border border-black px-4 py-2">
                <a className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Editar</a>
                <a className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Eliminar</a>
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  )
}

export default Tablaproductos
