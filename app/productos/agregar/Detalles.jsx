
import React from 'react'
import Select from "react-select"





export default function Detalles(props) {



   //FUNCIONES MANEJADORAS DE ESTADOS 


      // maneja los detalles seleccionados
    function handleselectedDetalles(selectedOptions) { 
          const random = selectedOptions?.map((item) => ({...item,value: Math.random(),})) || [];
          props.setSelectedDetalles(random); 
        
        }


   //agrega el titulo 
    function tituladora(index, titulo) {
          props.setSelectedDetalles((prevDetalles) =>
          prevDetalles.map((detalle, ind) =>
          ind === index ? { ...detalle, titulo } : detalle));

}



   function handleModificaDetalles(index, campo, valor) {
          props.setSelectedDetalles((prevDetalles) =>
          prevDetalles.map((detalle, ind) => {

              if (ind === index) { return {...detalle,[campo]: {...detalle[campo],value: valor,},}; }
              return detalle; })
          );
        }







  return (

    <section className="border border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">


         {/* Formulario con Select y campos dinámicos */}
      
        <Select
          isDisabled={props.isSubmitting}
          instanceId="plantillas"
          options={props.plantillas}
          isSearchable={true}
          isMulti={true}
          closeMenuOnSelect={false}
          value={props.selectedDetalles}
          onChange={handleselectedDetalles}
          placeholder="Selecciona una o varias plantillas..."/>






          {/* Mostrar el estado actual de Detalles en formato JSON */}
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(props.selectedDetalles, null, 2)}
        </pre> 








          {/* Campos dinámicos basados en la selección */}

        <div className="mt-6 space-y-6">
          {props.selectedDetalles?.map((plantilla, index) => (




            <div key={plantilla.value} className="border rounded-xl p-4 bg-gray-50 shadow-sm">

              

              <div className="grid grid-cols-2 gap-3">

                 <h2 className="text-lg font-semibold mb-3 text-gray-800">{plantilla.label}</h2>

                 <input
                             type="text"
                             value={plantilla.titulo || ""}
                             className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                             placeholder="Titulo de la plantilla ( opcional )"
                             disabled={props.isSubmitting}
                             onChange={(e) => { tituladora(index, e.target.value ) }}/>

                  

                {Object.entries(plantilla).map(([campo, propiedades]) => {
                  if (["label", "value", "id"].includes(campo)) return null;
                  return (

                    <div key={campo} className="flex flex-col">
                      <label className="text-sm text-gray-600">{campo}</label>



                            {propiedades.input ? (

                             <input
                             type="text"
                             className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                             placeholder={propiedades.placeholder}
                             disabled={props.isSubmitting}
                             value={propiedades.value || ""}
                             onChange={(e) => handleModificaDetalles(index, campo, e.target.value)}/>
                             
                             ) : null}




                             {propiedades.select ? (

                             <Select
                              instanceId="campos-select"
                              isDisabled={props.isSubmitting} 
                              placeholder={propiedades.placeholder}
                              value={propiedades.value || ""}      
                              options={propiedades.select.map((opt) => ({label: opt, value: opt}))}
                              isMulti={propiedades.ismulti || false}
                              isSearchable={propiedades.searchable || false}
                              closeMenuOnSelect={!propiedades.ismulti || true}
                              onChange={(e) => handleModificaDetalles(index, campo, e)}
                              className="w-full rounded-lg border border-gray-300 bg-white px-3  sm:py-1.5 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"/>

                              
                             ) : null}





                    </div>
                  );


                })}
              </div>
            </div>


          ))}
        </div>



    </section>
  );
  
}
