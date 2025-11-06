
"use client"

// importaciones
import axios from "axios"
import Medios from "./Medios"
import Basicos from "./Basicos"
import Detalles from "./Detalles"
import Acciones from "./Acciones"
import Descripcion from "./Descripcion"
import { useState, type ChangeEvent, type FormEvent } from "react"





//main function
export default function FormularioProducto() {     




  // ESTADOS
  const [selectedImages, setSelectedImages] = useState<File[]>([]); // imagenes que se agregan al formulario
  const [charge, setCharge] = useState<string>(""); // mensajes del proceso de envio al S3 e.j: "Procesando..."
  const [isSubmitting, setIsSubmitting] = useState(false);




  // FUNCIONES MANEJADORAS DE EVENTOS

   // agrega las imagenes a el arreglo de imagenes
  function handleImageChange (e: ChangeEvent<HTMLInputElement>)  {
    if (e.target.files) { const filesArray = Array.from(e.target.files); setSelectedImages((prev) => [...prev, ...filesArray])}}

    // elimina una imagen del arreglo de imagenes
  function handleRemoveImage (indexToRemove: number) {
    setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove))}




    // maneja el boton de submit
   async function submit (e: FormEvent<HTMLFormElement>)  {
    
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
      setIsSubmitting(true)
    }
  }








  
  return (

    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border">
      <div className="rounded-xl sm:rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">


        {/* Header */}
        <div className="border  px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-gray-900">Añadir producto</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Completa los detalles para publicar un nuevo artículo en su tienda.
          </p>
        </div>




        <form className="space-y-6 sm:space-y-8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8 border" onSubmit={submit}>

            <Basicos     isSubmitting={isSubmitting} />

            <Medios 
                         handleImageChange={handleImageChange} 
                         handleRemoveImage={handleRemoveImage} 
                         selectedImages={selectedImages}
                         isSubmitting={isSubmitting} />
            
            <Detalles    isSubmitting={isSubmitting} />

            <Descripcion isSubmitting={isSubmitting} />

            <Acciones    isSubmitting={isSubmitting} />

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
