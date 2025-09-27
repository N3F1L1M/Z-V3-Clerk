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

  const handleRemoveImage = (indexToRemove: number) => {
    setSelectedImages((prev) => prev.filter((_, index) => index !== indexToRemove));
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
  

    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm w-3/4 md:p-8">









      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-5 md:px-8">
        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900">
          Añadir producto
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Completa los detalles para publicar un nuevo artículo en tu tienda.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-8 px-6 py-6 md:px-8" onSubmit={submit}>











        {/* Básicos */}
        <section>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
            Información básica
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Título */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="titulo" className="text-sm font-medium text-gray-700">
                Título <span className="text-red-500">*</span>
              </label>
              <input
                id="titulo"
                type="text"
                placeholder="Ej. Camiseta básica unisex"
                name="titulo"
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              <p className="text-xs text-gray-500">
                Se usa para la búsqueda y en la página del producto.
              </p>
            </div>

            {/* Precio */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="precio" className="text-sm font-medium text-gray-700">
                Precio <span className="text-red-500">*</span>
              </label>

              <div className="flex rounded-lg border border-gray-300 bg-white shadow-sm focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
                <span className="inline-flex select-none items-center px-3 text-gray-500 text-sm border-r border-gray-200">
                  $
                </span>
                <input
                  id="precio"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  name="precio"
                  required
                  className="w-full rounded-r-lg px-3 py-2.5 text-gray-900 placeholder:text-gray-400 outline-none"
                />
              </div>
              <p className="text-xs text-gray-500">No incluyas impuestos ni envío.</p>
            </div>
          </div>
        </section>

















        {/* Medios */}
        <section>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
            Medios
          </h3>

          {/* Drop area simple + input file */}
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
            <label
              htmlFor="imagenes"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Imágenes del producto
            </label>

            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-6 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 16.5V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2.5M16 9l-4-4m0 0L8 9m4-4v12"
                />
              </svg>
              <p className="text-sm text-gray-600">
                Arrastra y suelta aquí o{" "}
                <label
                  htmlFor="imagenes"
                  className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-700"
                >
                  selecciona archivos
                </label>
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF (máx. 10MB c/u)</p>

              <input
                id="imagenes"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="sr-only"
              />
            </div>

            {/* Previews */}
            {selectedImages.length > 0 && (
              <div className="mt-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {selectedImages.length} imagen{selectedImages.length > 1 ? "es" : ""} seleccionada{selectedImages.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="group relative">
                      <div className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview-${index}`}
                          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-xs font-semibold text-white shadow-sm transition hover:bg-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                        aria-label={`Eliminar imagen ${index + 1}`}
                      >
                        &times;
                      </button>
                      <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>


















        {/* Detalles */}
        <section>
          <h3 className="mb-4 text-sm font-medium uppercase tracking-wide text-gray-500">
            Detalles
          </h3>

          <div className="grid grid-cols-1 gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="detalles" className="text-sm font-medium text-gray-700">
                Detalles (opcional)
              </label>
              <input
                id="detalles"
                type="text"
                placeholder="Color, talla, material…"
                name="detalles"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
              <p className="text-xs text-gray-500">
                Texto corto que aparece junto al título.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="descripcion"
                className="text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                placeholder="Describe el producto, beneficios, cuidados y materiales."
                name="descripcion"
                rows={6}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-y"
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Consejo: Usa párrafos breves y listas.
                </p>
                <span className="text-xs text-gray-400">Markdown permitido</span>
              </div>
            </div>
          </div>
        </section>





















        {/* Acciones */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
          <input
            type="reset"
            value="Restablecer"
            className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:bg-gray-100"
          />

          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-300"
          >
            Cargar producto
          </button>
        </div>
      </form>

      {/* Footer / estado de carga */}
      {charge && (
        <div className="border-t border-gray-200 px-6 py-4 md:px-8">
          <h3 className="text-center text-sm font-medium text-gray-700">{charge}</h3>
        </div>
      )}



    </div>
 
);

}
