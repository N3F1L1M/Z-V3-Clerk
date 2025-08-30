
import { client } from '@/library/Typesense_client';

export default async function cargartexto(userId) {
    
  let document = {
  'titulo': 'prueba desde backend',
  'precio': 12.50
  }

client.collections('productos').documents().create(document)


}
