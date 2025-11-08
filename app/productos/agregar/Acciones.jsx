import React from 'react'

export default function Acciones(props) {
  return (
    
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end pt-2 border border-gray-300 rounded-lg sm:rounded-xl ">



            <button type="reset" onClick={() => props.setIsSubmitting(false)}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg 
              border border-gray-300 bg-red-700 px-4 py-2.5 sm:py-3 text-sm font-medium
               text-white shadow-sm transition hover:bg-red-800 active:bg-gray-100
                disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"> Restablecer </button>
            
              
          
            <button
              type="submit" disabled={props.isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg
               bg-green-700 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-sm transition
                hover:bg-green-800 active:bg-indigo-800 focus:outline-none focus-visible:ring-4
                 focus-visible:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2">
                  Cargar producto</button>



          </div>
  )
}
