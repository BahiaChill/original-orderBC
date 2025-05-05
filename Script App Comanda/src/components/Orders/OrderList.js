import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders, onEditItem, onRemoveItem }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium text-gray-800 mb-4">Pedidos Actuales</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay pedidos registrados</p>
      ) : (
        <div className="space-y-2">
          {orders.map(order => (
            <OrderItem
              key={order.id}
              item={order}
              onEdit={onEditItem}
              onRemove={onRemoveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;