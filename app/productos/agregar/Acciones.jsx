import React from 'react'

export default function Acciones(props) {
  return (
    
    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end pt-2 border border-gray-300 rounded-lg sm:rounded-xl ">



            <button type="reset" disabled={props.isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg 
              border border-gray-300 bg-white px-4 py-2.5 sm:py-3 text-sm font-medium
               text-gray-700 shadow-sm transition hover:bg-gray-50 active:bg-gray-100
                disabled:opacity-50 disabled:cursor-not-allowed order-2 sm:order-1"> Restablecer </button>
            
              
          
            <button
              type="submit" disabled={props.isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg
               bg-indigo-600 px-5 py-2.5 sm:py-3 text-sm font-semibold text-white shadow-sm transition
                hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus-visible:ring-4
                 focus-visible:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2">

              {props.isSubmitting ? (

                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">

                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      
                  </svg>  Procesando... </>
                 
                
              ) : ( "Cargar producto" )}
                
              
            </button>
          </div>
  )
}
