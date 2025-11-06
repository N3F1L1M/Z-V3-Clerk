import React from 'react'
import Select from "react-select";

export default function Detalles(props) {
  return (
     <section className="border">
            <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium uppercase tracking-wide text-gray-500">
              Detalles
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="detalles" className="text-sm font-medium text-gray-700">
                  Detalles (opcional)
                </label>
                <input
                  id="detalles"
                  type="text"
                  placeholder="Color, talla, material…"
                  name="detalles"
                  disabled={props.isSubmitting}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500">Texto corto que aparece junto al título.</p>
              </div>

              
            </div>
          </section>
  )
}
