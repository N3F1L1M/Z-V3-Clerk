
import { client } from '@/lib/Typesense_client';



export default async function Textocharger(formdata, idproducto, userId, imagenes) {


  let document = {
  
  'tipo':0,
  'id': idproducto,
  'id_tienda': userId,
  'imagenes': imagenes,
  'titulo': formdata.get("titulo"),
  'descripcion': formdata.get("descripcion"),
  'precio': parseFloat(formdata.get("precio")),
  'detalles': JSON.parse(formdata.get("detalles"))
  
  
  }

  await client.collections("productos").documents().create(document);

}
