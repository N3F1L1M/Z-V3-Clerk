

import sharp from "sharp";
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";





export default async function S3charger(images, idproducto, userId, imgUrls) {


        //SE INICIA EL CLIENTE DE AWS
        const { S3Client } = require("@aws-sdk/client-s3");

        const bucket = process.env.AWS_BUCKET_NAME;//se selecciona el bucket
        const s3Client = new S3Client({ region: process.env.AWS_BUCKET_REGION,
                credentials: {accessKeyId: process.env.AWS_ACCESS_KEY,secretAccessKey: process.env.AWS_SECRET_KEY},});



        let cont = 0

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

            //Se crea la URL Cloudfront de la imagen cargada
            const cloudfrontUrl = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${outputkey}`;
            imgUrls.push(cloudfrontUrl);
            cont = cont + 1;   
        }
  

}