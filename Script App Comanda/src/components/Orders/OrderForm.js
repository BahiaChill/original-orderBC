import React, { useState, useEffect } from 'react';
import ProductSearch from './ProductSearch';

const OrderForm = ({ products = [], selectedTable, onAddItem, onUpdateItem, editingItem, onCancelEdit }) => {
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingItem) {
      setSelectedProduct(editingItem.productId);
      setQuantity(editingItem.quantity);
      setNotes(editingItem.notes || '');
    } else {
      resetForm();
    }
  }, [editingItem]);

  const resetForm = () => {
    setSelectedProduct('');
    setQuantity(1);
    setNotes('');
  };

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => p.id === selectedProduct);
    
    if (!product || !selectedTable) return;

    const orderItem = {
      id: editingItem ? editingItem.id : Date.now(),
      productId: selectedProduct,
      name: product.name,
      price: product.price,
      quantity: quantity,
      table: selectedTable,
      notes: notes
    };

    if (editingItem) {
      onUpdateItem(orderItem);
    } else {
      onAddItem(orderItem);
      resetForm();
    }
  };

  const labelStyle = { color: '#3d819d' };
  const inputStyle = { 
    borderColor: '#3d819d', 
    '--tw-ring-color': '#3d819d' 
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <h3 className="text-lg font-medium mb-4" style={labelStyle}>
        {editingItem ? 'Editar Pedido' : 'Nuevo Pedido'}
      </h3>
      {selectedTable ? (
        <form onSubmit={handleSubmit}>
          <ProductSearch 
            products={products} 
            onSelectProduct={handleSelectProduct} 
          />
          
          {selectedProduct && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" style={labelStyle}>
                  Producto seleccionado
                </label>
                <div className="w-full px-3 py-2 bg-gray-50 rounded-lg">
                  {products.find(p => p.id === selectedProduct)?.name || 'Producto no encontrado'}
                </div>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" style={labelStyle}>
                  Precio Unitario
                </label>
                <div className="w-full px-3 py-2 bg-gray-50 rounded-lg">
                  ${products.find(p => p.id === selectedProduct)?.price || '0'}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" style={labelStyle}>
                  Cantidad
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition"
                  style={inputStyle}
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" style={labelStyle}>
                  Notas
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition"
                  style={inputStyle}
                  rows="2"
                  placeholder="Especificaciones adicionales..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      onCancelEdit();
                      resetForm();
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                  style={{ backgroundColor: '#3d819d' }}
                >
                  {editingItem ? 'Actualizar' : 'Agregar'}
                </button>
              </div>
            </>
          )}
        </form>
      ) : (
        <p className="text-gray-500 text-center py-4">Selecciona una mesa para comenzar</p>
      )}
    </div>
  );
};

export default OrderForm;

// DONE