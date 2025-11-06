

import Tablaproductos from "./Tablaproductos";
import BotomAgregarProducto from "./BotomAgregarProducto";
import { auth } from "@clerk/nextjs/server";
import { client } from '@/lib/Typesense_client';






//FUNCION BUSCADORA TYPESENSE
async function buscadoratypesense(userId) {

    const searchParameters = {
      q: userId,
      query_by: 'id_tienda',
      filter_by: '',
      sort_by: '_text_match:desc'  };

 
  try { const results = await client
      .collections('productos')
      .documents()
      .search(searchParameters);

      return results; // Aquí accedes a los resultados

  } catch (error) { return ('Error al buscar:', error);}}
//FUNCION BUSCADORA TYPESENSE
  








  async function page() {

    const { userId } = await auth();

    let datos = await buscadoratypesense(userId);

    let productos = datos.hits.map(hit => hit.document);
    //console.log(productos);

   return (
     <div className="h-full bg-[#c2c0bc] p-4">

       <BotomAgregarProducto />
       <Tablaproductos productos={productos} />
     </div>
   );
 }

 export default page;
