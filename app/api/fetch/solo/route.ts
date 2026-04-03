import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/Typesense_client";

import S3borrador from "../solo/S3borrador";






//FUNCION GET
export async function GET(req: NextRequest) {
 
  const { userId } = await auth();  //se carga los datos de sesion

  try {

    //se revisa que el usuario este loggeado
    if (!userId) {return NextResponse.json({ message: "Error: No autorizado. Debes iniciar sesión." },{status:401});}


    
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {return NextResponse.json({ message: "ID es requerido" },{ status: 400 });}


    //FUNCIÓN DE BUSQUEDA EN TYPESENSE
    const results = await client
      .collections("productos")
      .documents(id)
      .retrieve();

    
    return NextResponse.json(results);

  } catch (error) { console.error(error);
    return NextResponse.json(
      { message: "Error en la búsqueda." },
      { status: 500 }
    );
  }
}







//FUNCION DELETE
export async function DELETE(req: NextRequest) {
  //se carga los datos de sesion
  const { userId } = await auth();
  const id = req.nextUrl.searchParams.get("id");

  try {
    if (!userId) {
      return NextResponse.json(
        { message: "Error: No autorizado. Debes iniciar sesión." },
        { status: 401 },
      );
    }
    if (!id) {
      return NextResponse.json({ message: "ID es requerido" }, { status: 400 });
    }

    await client.collections("productos").documents(id).delete();

    //borrar imagenes del producto en S3
    await S3borrador(id, userId);

    return NextResponse.json(
      { message: "Producto eliminado correctamente." },
      { status: 200 },
    ); // Devuelve un mensaje de éxito en formato JSON
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { message: "Error interno al eliminar." },
      { status: 500 },
    );
  }
}
