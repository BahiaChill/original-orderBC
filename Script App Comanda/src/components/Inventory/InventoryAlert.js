import React, { useState, useEffect } from 'react';

const InventoryAlert = ({ inventory, threshold = 50 }) => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const lowItems = inventory.filter(item => item.stock <= item.minStock * (threshold / 100));
    setLowStockItems(lowItems);
    setShowAlert(lowItems.length > 0);
  }, [inventory, threshold]);

  const sendEmailAlert = () => {
    // Aquí iría la lógica para enviar el correo usando Google Apps Script
    console.log('Enviando alerta de inventario bajo por email');
    setShowAlert(false);
  };

  if (!showAlert) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-lg max-w-md z-50">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">¡Alerta de Inventario Bajo!</h3>
          <p className="text-sm">Los siguientes productos están por debajo del {threshold}% del stock mínimo:</p>
          <ul className="list-disc pl-5 mt-2 text-sm">
            {lowStockItems.map(item => (
              <li key={item.id}>{item.name} - {item.stock} unidades (mínimo: {item.minStock})</li>
            ))}
          </ul>
        </div>
        <button
          onClick={sendEmailAlert}
          className="ml-4 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
        >
          Enviar Alerta
        </button>
      </div>
    </div>
  );
};

export default InventoryAlert;