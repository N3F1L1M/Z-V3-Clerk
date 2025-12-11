
"use client"

// importaciones
import axios from "axios"
import {useState} from "react"
import plantillasOriginal from "@/lib/plantillas_detalles"

import Medios from "./Medios"
import Basicos from "./Basicos"
import Detalles from "./Detalles"
import Acciones from "./Acciones"
import Descripcion from "./Descripcion"







//main function
export default function FormularioProducto() {     




  // ESTADOS
  const plantillas = structuredClone(plantillasOriginal);
  const [selectedImages, setSelectedImages] = useState([]); // imagenes que se agregan al formulario
  const [charge, setCharge] = useState(""); // mensajes del proceso de envio al S3 e.j: "Procesando..."
  const [selectedDetalles, setSelectedDetalles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  





  // FUNCIONES MANEJADORAS DE EVENTOS


    // maneja el boton de submit
   async function submit (e)  {
    
    e.preventDefault()
    

    try {
        
        
        setIsSubmitting(true);
        const formData = new FormData();

        // Se agregan los datos al formulario
        formData.append("titulo", e.currentTarget.titulo.value);
        formData.append("precio", e.currentTarget.precio.value);
        formData.append("descripcion", e.currentTarget.descripcion.value);
        selectedImages?.forEach((image) => {formData.append("images", image)});

        // se limpia los detalles antes de agregarlos al formulario
        const deta = selectedDetalles?.map(item => {
        const limpio = Object.fromEntries(Object.entries(item).map(([key, prop]) => [key,
        typeof prop.value === "string" && prop.value !== ""?prop.value
                                      :Array.isArray(prop.value)?prop.value.map(i => i.value).join(", ")
                                      :prop.value?.value]));                       
          return { ...limpio, label: item.label, titulo: item.titulo };
        
        });
        formData.append("detalles", JSON.stringify(deta));


        // se envia los datos que se agregaron al formulario a la ruta de api/s3
        // Para que la peticion acepte imagenes y no texto, especificamos que el contentType sea multipart/form-data
        const {data} = await axios.post("/api/cargar", formData, {headers: { "Content-Type": "multipart/form-data" },});


        // Condicional para validar que la peticion fue exitosa
        if (data.success) {
          setCharge("Se ha cargado el producto exitosamente.");
          
        }



        




      
    } catch (error) { // manejadora de errores
    
      console.log(error)
      // busca si el APi lanzo mensaje de error, si no tira uno por defecto.
      if (error.response?.data?.message) { setCharge(error.response.data.message) }
      else { setCharge("Ha ocurrido un Error...") }
    
    } 


  }


 

  
  return (

    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border">
      <div className="rounded-xl sm:rounded-2xl border border-gray-300 bg-white shadow-sm overflow-hidden">


        {/* Header */}
        <div className="border border-gray-300  px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-gray-900">Añadir producto</h2>
          <p className="mt-1 text-xs sm:text-sm text-gray-500">
            Completa los detalles para publicar un nuevo artículo en su tienda.
          </p>
        </div>




      <form className="space-y-6 sm:space-y-8 px-4 py-5 sm:px-6 sm:py-6 lg:px-8" onSubmit={submit}>


            <Basicos     isSubmitting={isSubmitting} />

            <Medios      isSubmitting={isSubmitting} 
                         selectedImages={selectedImages}
                         setSelectedImages={setSelectedImages}/>

            <Detalles    plantillas={plantillas}
                         isSubmitting={isSubmitting}
                         selectedDetalles={selectedDetalles}
                         setSelectedDetalles={setSelectedDetalles}/>
                         
            <Descripcion isSubmitting={isSubmitting} />

            <Acciones    isSubmitting={isSubmitting} 
                         setIsSubmitting={setIsSubmitting} />

        </form> 



                
              


        
        {isSubmitting && (
          <div className="border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">

            {charge?

                    <div className={`text-center text-xs sm:text-sm font-medium 
                          ${charge.includes("exitosamente")
                          ? "text-green-700 bg-green-50 py-2 rounded-lg"
                          : charge.includes("Error")? "text-red-700 bg-red-50 py-2 rounded-lg": "text-gray-700"}`}>

              {charge} </div>


            : <div  className="flex  text-xs sm:text-lg font-medium justify-center gap-5">
               <svg className="animate-spin h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      
                  </svg>  Procesando... </div>}

      

      
          </div>
        )}




      </div>
    </div>
  )
}
