"use client";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";

export default function formulario() {
  //VARIABLES o ESTADOS (Hook de react)
  const [selectedImages, setSelectedImages] = useState<File[]>([]); //imagenes que se agregan al formulario.
  const [images, setImages] = useState<string[]>([]); //guardan las urls de las imagenes que se carguen
  const [charge, setCharge] = useState<string>(""); //mensajes del proceso de envio al S3 e.j: "Procesando..."

  //fUNCIONES MANEJADORAS DE EVENTOS

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    //agrega las imagenes a el arreglo
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedImages(filesArray);
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    //maneja el boton de submit
    e.preventDefault();

    try {
      //Se verifica que el campo de imagenes tenga al menos 1 imagen
      if (selectedImages.length > 0) {
        setCharge("Procesando...");
        const formData = new FormData();

        //Se carga un objeto del formulario con las imagenes
        selectedImages.forEach((image) => {
          formData.append("images", image);
        });

        //se agregan los campos de texto al formulario
        formData.append("titulo", e.currentTarget.titulo.value);
        formData.append("precio", e.currentTarget.precio.value);
        formData.append("detalles", e.currentTarget.detalles.value);
        formData.append("descripcion", e.currentTarget.descripcion.value);

        //se envia los datos que se agregaron al formulario a la ruta de api/s3
        //Para que la peticion acepte imagenes y no texto, especificamos que el contentType sea multipart/form-data
        const { data } = await axios.post("/api/cargar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setCharge("Enviando a Bucket...");

        //Condicional para validar que la peticion fue exitosa
        if (data.success) {
          setCharge("Se han cargado las imagenes exitosamente");
        }
      }

    } catch (error: any) { //manejadora de errores

      console.log(error);
      //busca si el APi lanzo mensaje de error, si no tira uno por defecto. 
      if (error.response?.data?.message) {setCharge(error.response.data.message);} 
      else {setCharge("Ha ocurrido un error...");}
    }
  };




  
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Añadir Producto</h2>

      <form className="space-y-4" onSubmit={submit}>
        <label className="block mb-1 font-medium">Titulo</label>
        <input
          type="text"
          placeholder="usado para la busqueda"
          name="titulo"
          className="w-full p-2 border rounded"
        />

        <label className="block mb-1 font-medium">Precio</label>
        <input
          type="number"
          step="0.01"
          placeholder="0.0"
          name="precio"
          className="w-full p-2 border rounded"
        />

        <div>
          {/* Input de las imagenes, cada vez que se carguen imagenes, este llamara la funcion de handleImageChange para llevar una lista viva de las imagenes que se estan cargando */}
          <label className="block mb-1 font-medium">
            Imágenes del producto
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border rounded bg-white"
          />

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

        <input
          type="text"
          placeholder="Detalles"
          name="detalles"
          className="w-full p-2 border rounded"
        />

        <textarea
          placeholder="Descripción"
          name="descripcion"
          className="w-full p-2 border rounded resize-none"
        />

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
        >
          Cargar Producto{" "}
        </button>

        <input
          type="reset"
          placeholder="Reset"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded"
        />
      </form>

      <h2 className="text-2xl font-bold mb-4 text-center">{charge}</h2>
    </div>
  );
}
