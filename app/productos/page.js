

import Tablaproductos from "./Tablaproductos";
import BotomAgregarProducto from "./BotomAgregarProducto";
import Imprimidor from './Imprimidor'


import { client } from '@/library/Typesense_client';

//FUNCION BUSCADORA TYPESENSE
async function buscadoratypesense() {  const searchParameters = {
    q: 'stark',
    query_by: 'company_name',
    filter_by: '',
    sort_by: '_text_match:desc'  };
 
  try { const results = await client
      .collections('companies')
      .documents()
      .search(searchParameters);

      return results; // Aquí accedes a los resultados

  } catch (error) { return ('Error al buscar:', error);}}
//FUNCION BUSCADORA TYPESENSE
  








  async function page() {

  var datos = await buscadoratypesense();

   return (
     <div className="flex-grow bg-amber-100  p-4">


      <Imprimidor datos={datos.hits} />
       <BotomAgregarProducto />
       <Tablaproductos />
     </div>
   );
 }

 export default page;
