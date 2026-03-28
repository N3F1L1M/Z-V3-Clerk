import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { client } from "@/lib/Typesense_client";

import S3borrador from "../solo/S3borrador";

//FUNCION GET
export async function GET(req: NextRequest) {
  //se carga los datos de sesion
  const { userId } = await auth();

  try {
    //se revisa que el usuario este loggeado
    if (!userId) {
      return NextResponse.json(
        { message: "Error: No autorizado. Debes iniciar sesión." },
        { status: 401 },
      );
    }

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
      sort_by: sort || "_text_match:desc",
    };

    const results = await client
      .collections("productos")
      .documents()
      .search(searchParameters);
    return NextResponse.json(results); // Devuelve los resultados de la búsqueda en formato JSON
  } catch (error) {
    return NextResponse.json(
      { message: "Error: en la busqueda." },
      { status: 500 },
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
