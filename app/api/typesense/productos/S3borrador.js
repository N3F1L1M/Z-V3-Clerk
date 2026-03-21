import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from "@aws-sdk/client-s3";

export default async function deleteProductImages(idproducto, userId) {

  const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  const bucket = process.env.AWS_BUCKET_NAME;

  const prefix = `${userId}/productos/${idproducto}/`;

  try {
    // 1. Listar archivos
    const listCommand = new ListObjectsV2Command({
      Bucket: bucket,
      Prefix: prefix,
    });

    const listedObjects = await s3Client.send(listCommand);

    if (!listedObjects.Contents || listedObjects.Contents.length === 0) {
      return;
    }

    // 2. Borrar todos
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: bucket,
      Delete: {
        Objects: listedObjects.Contents.map((obj) => ({
          Key: obj.Key,
        })),
      },
    });

    await s3Client.send(deleteCommand);

  } catch (error) {
    console.error("Error eliminando imágenes:", error);
    throw error;
  }
}