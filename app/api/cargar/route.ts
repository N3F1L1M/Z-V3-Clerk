import { NextRequest, NextResponse } from "next/server";

import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { auth } from "@clerk/nextjs/server";
import { nanoid } from "nanoid";
import sharp from "sharp";

import Textocharger from "./Textocharger";






//SE INICIA EL CLIENTE DE AWS
const { S3Client } = require("@aws-sdk/client-s3");
//Se asignan variables en base a los valores del .env
const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY},});

const bucket = process.env.AWS_BUCKET_NAME;//se selecciona el bucket


let cont = 0; //Variable para contar el ciclo para determinar que imagen lleva el prefijo de portada







//FUNCION POST 
export async function POST(req: NextRequest) {

    //se carga los datos del formulario y de sesion 
     const formData = await req.formData();
     const { userId, sessionId } = await auth();


    try {


        //REVISION DE DATOS

        //se revisa que el usuario este loggeado
        if (!userId) {
            return NextResponse.json({
                message: "No autorizado. Debes iniciar sesión."
            }, { status: 401 });
        }

          //Se obtienen las imagenes enviadas en el formulario
        const images = formData.getAll("images") as File[];

        //Condicional para retornar mensaje en caso de que no se envien imagenes
                if (!images || images.length === 0) {
                    return NextResponse.json({
                        success: false,
                        message: "No images received",
                        data: null,
                    });
                }








        //SE EMPIEZA A CARGAR EL PRODUCTO 


        const idproducto = nanoid(); //se genera una ID para el producto



                /*

        //Se llama a la funcion para cargar el texto en Typesense
         const result = await Textocharger(formData, idproducto, userId);

        //Se revisa si la carga fue exitosa
        if (!result.success) {
            return NextResponse.json({
                success: false,
                message: result.message
            }, { status: 400 });
        }

            */
      

      

        const urls: string[] = [];//Variable para almacenar el arreglo de urls de las imagenes cargadas

        for (const image of images) {
            //Buffers para el manejo de imagenes
            const arrayBuffer = await image.arrayBuffer();
            const inputBuffer = Buffer.from(arrayBuffer);

            //Este es el nombre de la imagen
            const outputkey = `${userId}/productos/${idproducto}/img-${cont}.webp`;

            //Este es el manejo del cambio de tamaño de la image a 1:1, junto con la compresion webp para que ocupe menos tamaño
            const resizedBuffer = await sharp(inputBuffer)
                .resize({
                    width: 1000,
                    height: 1000,
                    fit: sharp.fit.cover,
                    position: sharp.strategy.entropy,
                })
                .webp({quality: 80})
                .toBuffer();
            
            //Esta variable arma un objeto con los datos necesarios para la carga de la imagen
            const uploadParams = {
                Bucket: bucket,
                Key: outputkey,
                Body: resizedBuffer,
                ContentType: "image/webp",
            };

            //putCommand es para la carga de la imagen, usa en conjunto con el objeto que creamos en base a la libreria de S3 de AWS
            const putCommand = new PutObjectCommand(uploadParams);
            await s3Client.send(putCommand);

            //Esta parte utilizando el getObject es para traer la imagen una vez cargada
            const getObjectParams = {
                Bucket: bucket,
                Key: `$(image.name)`,
                ACL: "private",
            };

            const getCommand = new GetObjectCommand(getObjectParams);

            //En conjunto con el getObject, se utiliza el getSignedUrl para generar la url para poder ver la imagen
            const url = await getSignedUrl(s3Client, getCommand, {
                expiresIn: 50000,
            });

            urls.push(url);
            cont = cont + 1;
        }

        //Se construye el JSON en caso que todo sea exitoso
        return NextResponse.json({
            success: true,
            message: "Imagenes cargadas y recortadas correctamente",
            data: { urls },
        });

    } catch (error) {
        //Se construye el JSON en caso de error en la carga, tambien se imprime por consola
        console.error("Upload error:", error);
        return NextResponse.json({
            success: false,
            message: "Error de servidor durante la carga",
            data: null,
        });
    }
}