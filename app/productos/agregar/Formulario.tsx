"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import axios from "axios"




export default function FormularioProducto() {



  // VARIABLES o ESTADOS (Hook de react)
  const [selectedImages, setSelectedImages] = useState<File[]>([]) // imagenes que se agregan al formulario
  const [charge, setCharge] = useState<string>("") // mensajes del proceso de envio al S3 e.j: "Procesando..."
  const [isSubmitting, setIsSubmitting] = useState(false)



  // FUNCIONES MANEJADORAS DE EVENTOS

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    // agrega las imagenes a el arreglo
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setSelectedImages((prev) => [...prev, ...filesArray])
    }
  }

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove))
  }






  const submit = async (e: FormEvent<HTMLFormElement>) => {
    // maneja el boton de submit
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Se verifica que el campo de imagenes tenga al menos 1 imagen
      if (selectedImages.length > 0) {
        setCharge("Procesando...")
        const formData = new FormData()

        // Se carga un objeto del formulario con las imagenes
        selectedImages.forEach((image) => {
          formData.append("images", image)
        })

        // se agregan los campos de texto al formulario
        formData.append("titulo", e.currentTarget.titulo.value)
        formData.append("precio", e.currentTarget.precio.value)
        formData.append("detalles", e.currentTarget.detalles.value)
        formData.append("descripcion", e.currentTarget.descripcion.value)

        // se envia los datos que se agregaron al formulario a la ruta de api/s3
        // Para que la peticion acepte imagenes y no texto, especificamos que el contentType sea multipart/form-data
        const { data } = await axios.post("/api/cargar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        setCharge("Enviando a Bucket...")

        // Condicional para validar que la peticion fue exitosa
        if (data.success) {
          setCharge("Se han cargado las imagenes exitosamente")
          // Limpiar formulario después de éxito
          setTimeout(() => {
            setSelectedImages([])
            setCharge("")
            e.currentTarget.reset()
          }, 2000)
        }
      } else {
        setCharge("Por favor, selecciona al menos una imagen")
      }
    } catch (error: any) {
      // manejadora de errores
      console.log(error)
      // busca si el APi lanzo mensaje de error, si no tira uno por defecto.
      if (error.response?.data?.message) {
        setCharge(error.response.data.message)
      } else {
        setCharge("Ha ocurrido un error...")
      }
    } finally {
      setIsSubmitting(false)
    }
  }












  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">


        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-gray-900">Añadir producto</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Completa los detalles para publicar un nuevo artículo en su tienda.
          </p>
        </div>



        {/* Form */}
        <form className="space-y-6 sm:space-y-8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8" onSubmit={submit}>






          {/* Básicos */}
          <section>
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
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
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
                    disabled={isSubmitting}
                    className="w-full rounded-r-lg px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 outline-none disabled:bg-gray-50 disabled:cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-gray-500">No incluyas impuestos ni envío.</p>
              </div>
            </div>
          </section>












          {/* Medios */}
          <section>
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
                  disabled={isSubmitting}
                  className="sr-only"
                />
              </div>

              {/* Previews */}
              {selectedImages.length > 0 && (
                <div className="mt-3 sm:mt-4">
                  <div className="mb-2 sm:mb-3 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-700">
                      {selectedImages.length} imagen{selectedImages.length > 1 ? "es" : ""} seleccionada
                      {selectedImages.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3">
                    {selectedImages.map((file, index) => (
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
                          disabled={isSubmitting}
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












          {/* Detalles */}
          <section>
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-500">
              Detalles
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="detalles" className="text-sm font-medium text-gray-700">
                  Detalles (opcional)
                </label>
                <input
                  id="detalles"
                  type="text"
                  placeholder="Color, talla, material…"
                  name="detalles"
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">Texto corto que aparece junto al título.</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  placeholder="Describe el producto, beneficios, cuidados y materiales."
                  name="descripcion"
                  rows={5}
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-y min-h-[120px] disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-xs text-gray-500">Consejo: Usa párrafos breves y listas.</p>
                  <span className="text-xs text-gray-400">Markdown permitido</span>
                </div>
              </div>
            </div>
          </section>










          {/* Acciones */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end pt-2">
            <button
              type="reset"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 sm:py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"
            >
              Restablecer
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Procesando...
                </>
              ) : (
                "Cargar producto"
              )}
            </button>
          </div>
        </form>







        {/* Footer / estado de carga */}
        {charge && (
          <div className="border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
            <div
              className={`text-center text-xs sm:text-sm font-medium ${
                charge.includes("exitosamente")
                  ? "text-green-700 bg-green-50 py-2 rounded-lg"
                  : charge.includes("error")
                    ? "text-red-700 bg-red-50 py-2 rounded-lg"
                    : "text-gray-700"
              }`}
            >
              {charge}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
