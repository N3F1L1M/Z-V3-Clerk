import React from 'react'

export default function Descripcion(props) {
  return (
    <div className="border border-gray-300 rounded-lg sm:rounded-xl p-4 sm:p-6">
                <label htmlFor="descripcion" className="text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  placeholder="Describe el producto, beneficios, cuidados y materiales."
                  name="descripcion"
                  rows={5}
                  disabled={props.isSubmitting}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder:text-gray-400 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 resize-y min-h-[120px] disabled:bg-gray-50 disabled:cursor-not-allowed"
                />
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <p className="text-xs text-gray-500">Consejo: Usa párrafos breves y listas.</p>
                  <span className="text-xs text-gray-400">Markdown permitido</span>
                </div>
              </div>
  )
}
