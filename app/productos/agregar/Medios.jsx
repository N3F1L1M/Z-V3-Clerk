import React from 'react'

export default function Medios(props) {



 // FUNCIONES MANEJADORAS DE EVENTOS

     // agrega las imagenes a el arreglo de imagenes
  function handleImageChange (e)  {

    if (e.target.files) { const filesArray = Array.from(e.target.files); 
      props.setSelectedImages((prev) => [...prev, ...filesArray])}
    
    }

    // elimina una imagen del arreglo de imagenes
  function handleRemoveImage (indexToRemove) {

    props.setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove))
  
  }








  return (
    
    <section className="border border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-500">
              Medios
            </h3>

            {/* Drop area simple + input file */}
            <div className="rounded-lg sm:rounded-xl border border-dashed border-gray-300 bg-gray-50 p-3 sm:p-4">
              <label htmlFor="imagenes" className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Imágenes del producto
              </label>

              <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-lg border border-gray-200 bg-white px-4 py-8 sm:py-10 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 16.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.5M16 9l-4-4m0 0L8 9m4-4v12"
                  />
                </svg>
                <div className="space-y-1">
                  <p className="text-sm sm:text-base text-gray-600">
                    <span className="hidden sm:inline">Arrastra y suelta aquí o </span>
                    <label
                      htmlFor="imagenes"
                      className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-700 active:text-indigo-800"
                    >
                      selecciona archivos
                    </label>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (máx. 10MB c/u)</p>
                </div>

                <input
                  id="imagenes"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  disabled={props.isSubmitting}
                  className="sr-only disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Previews */}
              {props.selectedImages.length > 0 && (
                <div className="mt-3 sm:mt-4">
                  <div className="mb-2 sm:mb-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {props.selectedImages.length} imagen{props.selectedImages.length > 1 ? "es" : ""} seleccionada
                      {props.selectedImages.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                    {props.selectedImages.map((file, index) => (
                      <div key={index} className="group relative">
                        <div className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                          <img
                            src={URL.createObjectURL(file) || "/placeholder.svg"}
                            alt={`preview-${index}`}
                            className="h-full w-full object-cover transition group-hover:scale-105"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          disabled={props.isSubmitting}
                          className="absolute -right-1 -top-1 sm:right-1 sm:top-1 inline-flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full bg-black/80 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:bg-black hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label={`Eliminar imagen ${index + 1}`}
                        >
                          ×
                        </button>
                        <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
  )
}
