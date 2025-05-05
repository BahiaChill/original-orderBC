import React, { useState } from 'react';

const ProductSearch = ({ products, onSelectProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar producto..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      {searchTerm && (
        <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <div
                key={product.id}
                className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                onClick={() => {
                  onSelectProduct(product.id);
                  setSearchTerm('');
                }}
              >
                <span className="font-medium">{product.name}</span>
                <span className="text-blue-600">${product.price}</span>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No se encontraron productos</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;