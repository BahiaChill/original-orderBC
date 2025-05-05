import React from 'react';

const OrderHistory = ({ orders }) => {
  const sortedOrders = [...orders].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.time}`);
    const dateB = new Date(`${b.date} ${b.time}`);
    return dateB - dateA; // Orden descendente (más reciente primero)
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4" style={{ color: '#3d819d' }}>Historial de Pedidos</h3>
      {sortedOrders.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No hay pedidos registrados</p>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-medium" style={{ color: '#3d819d' }}>Pedido #{sortedOrders.length - index}</h4>
                  <p className="text-sm text-gray-500">{order.date} - {order.time}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">Mesa: {order.table}</p>
                  <p className="text-sm">Mesero: {order.user}</p>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                {order.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="flex justify-between mb-1">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-medium" style={{ color: '#3d819d' }}>${item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between">
                <span className="font-bold">Total:</span>
                <span className="font-bold" style={{ color: '#3d819d' }}>
                  ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
                </span>
              </div>
            </div>
          ))}
          <p className="text-center text-gray-500 py-4">No hay más pedidos</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

// DONE