
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from '@/lib/Typesense_client';


//FUNCION GET 
export async function GET(req: NextRequest) {



    //se carga los datos de sesion 
     const { userId } = await auth();

    try {
        //se revisa que el usuario este loggeado
        if (!userId) {return NextResponse.json({message: "Error: No autorizado. Debes iniciar sesión."}, { status: 401 });}


        const query = req.nextUrl.searchParams.get("q");
        const page = req.nextUrl.searchParams.get("page");
        const sort = req.nextUrl.searchParams.get("s");
        console.log(sort);

        //FUNCION BUSCADORA TYPESENSE
        const searchParameters = {
              q: query || "*",
              query_by: "titulo",
              filter_by: `id_tienda:=${userId}`,
              page: Number(page) || 1,
              sort_by: sort || "_text_match:desc"};


         const results = await client
              .collections('productos')
              .documents()
              .search(searchParameters);
              return NextResponse.json(results); // Devuelve los resultados de la búsqueda en formato JSON
        
          
        //FUNCION BUSCADORA TYPESENSE
        
    } 
    
    
    
    catch (error) { 
        return NextResponse.json({message: "Error: en la busqueda."}, { status:500 }); }
        
            
            
            
       
    
}