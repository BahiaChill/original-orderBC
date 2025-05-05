import React, { useState } from 'react';
import googleSheets from '../../services/googleSheets';

const OrderSummary = ({ orders, onSendOrder, hasItems }) => {
  const [isSending, setIsSending] = useState(false);

  const handleSendOrder = async () => {
    if (!hasItems) return;
    
    setIsSending(true);
    try {
      const total = orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const orderData = {
        table: orders[0].table,
        items: orders.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total,
        user: 'Mesero' // Esto debería venir del estado del usuario
      };

      await googleSheets.sendOrder(orderData);
      onSendOrder();
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('Error al enviar el pedido');
    } finally {
      setIsSending(false);
    }
  };

  const total = orders.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4" style={{ color: '#3d819d' }}>Resumen del Pedido</h3>
      <div className="space-y-3">
        {orders.map((order, index) => (
          <div key={index} className="flex justify-between">
            <span>{order.name} x {order.quantity}</span>
            <span className="font-medium" style={{ color: '#3d819d' }}>
              ${(order.price * order.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
        <span className="font-bold">Total:</span>
        <span className="font-bold" style={{ color: '#3d819d' }}>
          ${total.toFixed(2)}
        </span>
      </div>
      <button
        onClick={handleSendOrder}
        disabled={!hasItems || isSending}
        className={`w-full mt-4 py-2 px-4 rounded-lg transition-colors ${!hasItems || isSending ? 'bg-gray-300 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
      >
        {isSending ? 'Enviando...' : 'Enviar Pedido'}
      </button>
    </div>
  );
};

export default OrderSummary;