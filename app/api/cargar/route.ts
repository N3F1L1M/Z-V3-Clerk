

import { nanoid } from "nanoid";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";


import Textocharger from "./Textocharger";
import S3charger from "./S3charger";






//FUNCION POST 
export async function POST(req: NextRequest) {

    //se carga los datos del formulario y de sesion 
     const formData = await req.formData();
     const { userId } = await auth();



    try {
        //REVISION DE DATOS

        //se revisa que el usuario este loggeado
        if (!userId) {return NextResponse.json({message: "Error: No autorizado. Debes iniciar sesión."}, { status: 401 });}

        const images = formData.getAll("images") as File[]; //Se obtienen las imagenes enviadas en el formulario
        //Condicional para retornar mensaje en caso de que no se envien imagenes
        if (!images || images.length === 0) {return NextResponse.json({message: "Error: No se recibieron imágenes"},{ status:400});}



        //SE EMPIEZA A CARGAR EL PRODUCTO 

        const idproducto = nanoid(); //se genera una ID para el producto
        let imgUrls: string[] = [];//arreglo con los links de las imagenes


        //Carga de imagenes en S3
        try{ await S3charger(images, idproducto, userId, imgUrls); }
        catch(error){ return NextResponse.json({message: "Error: Fallo de carga de imagenes."}, { status:424 }); }  




        //Carga del texto en Typesense
        try{ await Textocharger(formData, idproducto, userId, imgUrls); }
        catch(error){ return NextResponse.json({message: "Error: Fallo de carga de texto."}, { status:424 }); }    
       
       
        // Si todo sale bien, se retorna exito
        return NextResponse.json({ success: true}, { status:201 });

        
    } 
    
    
    
    catch (error) { 
        return NextResponse.json({message: "Error: Fallo de servidor durante la carga."}, { status:500 }); }
        
            
            
            
       
    
}