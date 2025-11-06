
import { client } from '@/lib/Typesense_client';



export default async function Textocharger(formdata, idproducto, userId, imgUrls) {


  let document = {
  
  'titulo': formdata.get("titulo"),
  'precio': parseFloat(formdata.get("precio")),
  'detalles': formdata.get("detalles"),
  'descripcion': formdata.get("descripcion"),
  'imagenes': imgUrls,
  'id_tienda': userId,
  'id': idproducto
  }

  await client.collections("productos").documents().create(document);

}
