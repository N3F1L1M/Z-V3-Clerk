import Link from "next/link";


export default function Formulario() {
  return (
    
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Agregar Nuevo Producto
        </h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              placeholder="Escribe el título del producto"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              placeholder="0.00"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Foto de Portada
            </label>
            <input
              type="file"
              className="mt-1 block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tipo de Tabla de Detalles
            </label>
            <select className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option value="">Selecciona una opción</option>
              <option value="simple">Simple</option>
              <option value="avanzada">Avanzada</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Detalles
            </label>
            <input
              type="text"
              placeholder="Especificaciones u observaciones"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              placeholder="Descripción completa del producto"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            ></textarea>
          </div>


          <div className="flex justify-end space-x-3 ">
            <Link href="/productos"
              type="button"
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Agregar Producto
            </button>
          </div>
          
        </form>
      </div>
   
  )
}
