
import { client } from '@/library/Typesense_client';


export default async function Textocharger(formdata, idproducto, userId) {


  console.log(formdata.get("precio"));

  let document = {
  'id': idproducto,
  'titulo': formdata.get("titulo"),
  'precio': parseFloat(formdata.get("precio")),
  'detalles': formdata.get("detalles"),
  'descripcion': formdata.get("descripcion"),
  
  }





try {
  
  await client
    .collections("productos")
    .documents()
    .create(document);

  return {
    success: true,
    message: "Documento creado con éxito",
  };

} catch (error) {

  console.log(error);
   
  return {
    success: false,
    message: "Error al crear documento",
  };
}



}
