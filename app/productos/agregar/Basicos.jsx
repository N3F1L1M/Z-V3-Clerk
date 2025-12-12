import React from 'react'





export default function Basicos(props) {

    
  return (
     <section className="border border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-500">
              Información Principal
            </h3>



            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {/* Título */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="titulo" className="text-sm font-medium text-gray-700">
                  Título <span className="text-red-500">*</span>
                </label>
                <input
                  id="titulo"
                  type="text"
                  placeholder="Ej. Camiseta básica unisex"
                  name="titulo"
                  required
                  disabled={props.isSubmitting}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"/>
                <p className="text-xs text-gray-500">Se usa para la búsqueda y en la página del producto.</p>
              </div>

              {/* Precio */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="precio" className="text-sm font-medium text-gray-700">
                  Precio <span className="text-red-500">*</span>
                </label>

                <div className="flex rounded-lg border border-gray-300 bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                  <span className="inline-flex select-none items-center px-3 sm:px-4 text-gray-500 text-sm sm:text-base border-r border-gray-200 bg-gray-50">
                    $
                  </span>
                  <input
                    id="precio"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    name="precio"
                    required
                    disabled={props.isSubmitting}
                    className="w-full rounded-r-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500">No incluyas impuestos ni envío.</p>
              </div>
            </div>
          </section>
  )
}
