
import React from 'react'
import Select from "react-select"





export default function Detalles(props) {

  

  return (

    <section className="border border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">


         {/* Formulario con Select y campos dinámicos */}
      
        <Select
          instanceId="plantillas"
          options={props.plantillas}
          isSearchable={true}
          isMulti={true}
          closeMenuOnSelect={false}
          value={props.selectedDetalles}
          onChange={props.handleselectedDetalles}
          placeholder="Selecciona una o varias plantillas..."/>






          {/* Mostrar el estado actual de Detalles en formato JSON */}
        <pre className="mt-4 bg-gray-100 p-2 rounded text-sm">
          {JSON.stringify(props.selectedDetalles, null, 2)}
        </pre> 








          {/* Campos dinámicos basados en la selección */}

        <div className="mt-6 space-y-6">
          {props.selectedDetalles?.map((plantilla, index) => (




            <div key={plantilla.value} className="border rounded-xl p-4 bg-gray-50 shadow-sm">

              <h2 className="text-lg font-semibold mb-3 text-gray-800">{plantilla.label}</h2>

              <div className="grid grid-cols-2 gap-3">

                {Object.entries(plantilla).map(([campo, propiedades]) => {
                  if (["label", "value", "id"].includes(campo)) return null;
                  return (

                    <div key={campo} className="flex flex-col">
                      <label className="text-sm text-gray-600">{campo}</label>



                            {propiedades.input ? (

                             <input
                             type="text"
                             className="border rounded px-2 py-1 text-sm"
                             placeholder={propiedades.placeholder}
                             value={propiedades.value || ""}
                             onChange={(e) => props.handleModificaDetalles(index, campo, e.target.value)}/>
                             
                             ) : null}




                             {propiedades.select ? (

                             <Select
                              instanceId="campos-select" 
                              placeholder={propiedades.placeholder}
                              value={propiedades.value || ""}      
                              options={propiedades.select.map((opt) => ({label: opt, value: opt}))}
                              isMulti={propiedades.ismulti || false}
                              isSearchable={propiedades.searchable || false}
                              closeMenuOnSelect={!propiedades.ismulti || true}
                              onChange={(e) => props.handleModificaDetalles(index, campo, e)}/>

                              
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
