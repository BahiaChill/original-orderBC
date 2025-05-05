import React from 'react';

const OrderItem = ({ item, onEdit, onRemove }) => {
  return (
    <div className="flex justify-between items-start p-3 bg-white rounded-lg shadow-sm mb-2">
      <div>
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-500">
          ${item.price} c/u × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
        </p>
        {item.notes && (
          <p className="text-xs text-gray-500 mt-1">Notas: {item.notes}</p>
        )}
        <p className="text-xs text-gray-700 mt-1">Mesa {item.table}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors text-sm"
        >
          Editar
        </button>
        <button
          onClick={() => onRemove(item.id)}
          className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors text-sm"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default OrderItem;

// DONE