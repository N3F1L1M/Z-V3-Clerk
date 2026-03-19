"use client";

import axios from "axios"
import Link from "next/link";

import React, { useState, useEffect, useRef  } from 'react';
import { Search, Edit, Trash2, Eye, Filter, 
         ChevronLeft,ChevronRight,Package,
        Image as ImageIcon,ArrowUpDown,ArrowUp,
        ArrowDown,BookOpen,Check} from 'lucide-react';







  //FUNCION PRINCIPAL   
 export default function TablaProductos () {

  const firstLoad = useRef(true);

  //ESTADOS
  const [query, setQuery] = useState("*");
  const [productos, setProductos] = useState([]);
  
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [copiedId, setCopiedId] = useState(null);



  // funcion que llama a el endpoint (API PERSONAL)de busqueda de productos en typesense

   async function fetchProductos() {
    try {
      const {data} = await axios.get("/api/typesense/productos", {params: {q:query},});
      console.log(data?.hits.map(hit => hit.document));
      setProductos(data?.hits.map(hit => hit.document));} 
    
    catch (error) {console.error(error);}
   }


   // funcion debounce para evitar  demasiadas llamadas a la API 
    useEffect(() => {
      if (firstLoad.current) {fetchProductos();firstLoad.current = false;return;}

      const timeout = setTimeout(() => {fetchProductos(); }, 300);
      return () => clearTimeout(timeout); }, [query]);
  



    // Función para manejar ordenamiento
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };



  // Función para formatear precio
  function formatPrice(price) {
    return new Intl.NumberFormat('es-MX', {style: 'currency',currency: 'MXN'}).format(price);}

    
  // Función para obtener estado del producto
  const getProductStatus = (producto) => {
    const stock = producto.stock || Math.floor(Math.random() * 100);
    if (stock === 0) return { status: 'sin-stock', label: 'Sin stock', color: 'text-red-600 bg-red-50 border-red-200' };
    if (stock < 10) return { status: 'bajo-stock', label: 'Bajo stock', color: 'text-yellow-600 bg-yellow-50 border-yellow-200' };
    return { status: 'en-stock', label: 'En stock', color: 'text-green-600 bg-green-50 border-green-200' };
  };

  // Paginación
  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const paginatedProducts = productos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // FUNCIONES DE ACCIONES
  const handleEdit = (productId) => {
    console.log('Editar producto:', productId);
    // Aquí implementarías la lógica de edición
  };

  const handleDelete = (productId) => {
    console.log('Eliminar producto:', productId);
    // Aquí implementarías la lógica de eliminación
  };

  const handleView = (productId) => {
    console.log('Ver producto:', productId);
    // Aquí implementarías la lógica para ver detalles
  };

  // Función para copiar ID al portapapeles
  const handleCopyId = async (productId) => {
    try {
      await navigator.clipboard.writeText(productId.toString());
      setCopiedId(productId);
      setTimeout(() => setCopiedId(null), 2000); // Resetear después de 2 segundos
    } catch (err) {
      console.error('Error al copiar ID:', err);
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = productId.toString();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedId(productId);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  // Función para manejar selección
  const toggleProductSelection = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };
  // Función para seleccionar/deseleccionar todos los productos en la página actual
  const toggleSelectAll = () => {
    if (selectedProducts.length === paginatedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(paginatedProducts.map(p => p.id));
    }
  };






  // Componente de icono de ordenamiento
  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' 
      ? <ArrowUp className="w-4 h-4 text-blue-600" />
      : <ArrowDown className="w-4 h-4 text-blue-600" />;
  };





  return (

    <div className="p-6 bg-white rounded-lg shadow mt-5">



      {/* Header con búsqueda y filtros */}
      <div className="mb-6 space-y-4 ">


      <div className="flex flex-col sm:flex-row gap-4">

          {/* Boton de agregar producto */}
          <Link href="/productos/agregar" 
          className="bg-emerald-700 text-white px-4 py-2  rounded hover:bg-emerald-500 " 
          >Agregar nuevo producto</Link>



          {/* Barra de busqueda */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              type="text"
              placeholder="Buscar productos por nombre o ID..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />

          </div>


          {/* Botones de acción */}
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              Filtros
            </button>

            {selectedProducts.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {selectedProducts.length} seleccionados
                </span>
                <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filtros desplegables */}
        {showFilters && (
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio mínimo
                </label>
                <input
                  type="number"
                  value={priceFilter.min}
                  onChange={(e) => setPriceFilter({...priceFilter, min: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio máximo
                </label>
                <input
                  type="number"
                  value={priceFilter.max}
                  onChange={(e) => setPriceFilter({...priceFilter, max: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  placeholder="999999"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setPriceFilter({ min: '', max: '' });
                    setSearchTerm('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            </div>
          </div>
        )}
        
      </div>{/* FIN Header con búsqueda y filtros */}
        








      {/* Tabla */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        
          


         {productos.length === 0 ? (
    
                <div className="p-8 text-center">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No hay productos para mostrar</p>
                </div>



              ) : (

                <table className="w-full bg-white">


          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedProducts.length === paginatedProducts.length && paginatedProducts.length > 0}
                  onChange={toggleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('titulo')}
              >
                <div className="flex items-center gap-2">
                  Producto
                  <SortIcon field="titulo" />
                </div>
              </th>
              
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Imagen
              </th>
              
              <th 
                className="px-4 py-3 text-left text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort('precio')}
              >
                <div className="flex items-center gap-2">
                  Precio
                  <SortIcon field="precio" />
                </div>
              </th>
              
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                Estado
              </th>
              
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                Acciones
              </th>
            </tr>
          </thead>




       <tbody className="divide-y divide-gray-200">
            {productos.map((producto) => {
              const status = getProductStatus(producto);
              
              return (
                
                <tr key={producto.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(producto.id)}
                      onChange={() => toggleProductSelection(producto.id)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="max-w-xs">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {producto.titulo}
                      </p>
                  
                    </div>
                  </td>
                  

                  <td className="px-4 py-4">
                    {producto.imagenes ? (

                      <img 
                        alt={producto.titulo}
                        src={`https://d67xyqggt6v2u.cloudfront.net/${producto.id_tienda}/productos/${producto.id}/img-0.webp`}
                        className="w-12 h-12 rounded-lg object-cover border border-gray-200"/>

                    ) : (

                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-gray-400" /> </div> )}
                  </td>
                  

                  <td className="px-4 py-4">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatPrice(producto.precio)}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${status.color}`}>
                      {status.label}
                    </span>
                  </td>
                  
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => handleCopyId(producto.id)}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          copiedId === producto.id 
                            ? 'text-green-600 bg-green-50 hover:bg-green-100' 
                            : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                        title={copiedId === producto.id ? 'ID copiado!' : 'Copiar ID'}
                      >
                        {copiedId === producto.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <BookOpen className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={() => handleView(producto.id)}
                        className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleEdit(producto.id)}
                        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(producto.id)}
                        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>




          </table>
    )}

      </div>
              {/* FIN de la tabla Tabla */}







      {/* Paginación */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">
              Mostrar
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="text-sm text-gray-700">
              de {filteredAndSortedProducts.length} productos
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 text-sm rounded-lg ${
                      currentPage === pageNumber
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Info de resultados */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Mostrando {paginatedProducts.length} de {productos.length} productos
        {productos.length !== productos.length && ` (filtrado de ${productos.length} total)`}
      </div>
    </div>
  );




};

