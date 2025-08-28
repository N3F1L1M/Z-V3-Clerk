"use client"
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";



export default function formulario() {


  //VARIABLES o ESTADOS (Hook de react)
  const [selectedImages, setSelectedImages] = useState<File[]>([]);//imagenes que se agregan al formulario. 
  const [images, setImages] = useState<string[]>([]);//guardan las urls de las imagenes que se carguen
  const [charge, setCharge] = useState<string>("");//mensajes del proceso de envio al S3 e.j: "Procesando..."




  //fUNCIONES MANEJADORAS DE EVENTOS 

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {//agrega las imagenes a el arreglo
    if (e.target.files) { const filesArray = Array.from(e.target.files); 
      setSelectedImages(filesArray);}};
      
     



  const submit = async (e: FormEvent<HTMLFormElement>) => {//maneja el boton de submit 
    e.preventDefault();
    console.log(selectedImages);

    try {//Se verifica que el campo de imagenes tenga al menos 1 imagen
      if (selectedImages.length > 0) {
        setCharge("Procesando...");
        const formData = new FormData();

        //Se carga un objeto del formulario con las imagenes
        selectedImages.forEach((image) => {
          formData.append("images", image); 
        });

        //se envia los datos que se agregaron al formulario a la ruta de api/s3
        //Para que la peticion acepte imagenes y no texto, especificamos que el contentType sea multipart/form-data
        const { data } = await axios.post("/api/s3", formData, {
          headers: {"Content-Type": "multipart/form-data",},});

        setCharge("Enviando a Bucket...");

        //Condicional para validar que la peticion fue exitosa
        if (data.success && Array.isArray(data.data.urls)) {
          setImages(data.data.urls);
          console.log(images);
          console.log(data.urls);
          setSelectedImages([]);
          setCharge("Se han cargado las imagenes exitosamente");
        }
      }
      
    } catch (error) {
      console.log(error);
      setCharge("Ha ocurrido un error...");
    }
  }

  return (

    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Añadir Producto</h2>
      {/* {if (images){
        <h2>Se han cargado las imagenes exitosamente</h2>
      }} */}


      <form className="space-y-4" onSubmit={submit}>

        <input type="text" placeholder="Título del producto"
          className="w-full p-2 border rounded"/>

        <input type="number" step="0.01" placeholder="0.0"
          className="w-full p-2 border rounded"/>




        <div>
              {/* Input de las imagenes, cada vez que se carguen imagenes, este llamara la funcion de handleImageChange para llevar una lista viva de las imagenes que se estan cargando */}
          <label className="block mb-1 font-medium">Imágenes del producto</label>

          <input type="file" accept="image/*" multiple onChange={handleImageChange}
            className="w-full p-2 border rounded bg-white"/>




          {/* Elemento que muestra visualmente las imagenes que se han agregado al formulario */}
          {selectedImages.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {selectedImages.map((file, index) => (
                <div key={index} className="w-20 h-20 relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="w-full h-full object-cover rounded border"
                  />
                </div>
              ))}
            </div>
          )}
        </div>



        <input type="text" placeholder="Detalles"
          className="w-full p-2 border rounded"/>

        <textarea placeholder="Descripción"
          className="w-full p-2 border rounded resize-none"/>
        

        <button type="submit" 
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded">
          Cargar Producto </button>
          
        <input type="reset"placeholder="Reset"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"/>
        
      </form>

      <h2 className="text-2xl font-bold mb-4 text-center">{charge}</h2> 

    </div>
  );
}

