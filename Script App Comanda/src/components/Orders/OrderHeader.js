import React, { useState } from 'react';

const OrderHeader = ({ tables, selectedTable, onTableChange }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [newTable, setNewTable] = useState('');

  const handleTableSelect = (e) => {
    const table = e.target.value;
    if (table && !selectedTable) {
      onTableChange(table);
    }
  };

  const requestTableChange = () => {
    setShowConfirm(true);
  };

  const confirmTableChange = () => {
    onTableChange(newTable);
    setShowConfirm(false);
    setNewTable('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1" style={{ color: '#3d819d' }}>Mesa</label>
        <div className="flex items-center">
          <select
            value={selectedTable || ''}
            onChange={handleTableSelect}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition mr-2"
            style={{ 
              borderColor: '#3d819d', 
              '--tw-ring-color': '#3d819d',
              backgroundColor: selectedTable ? '#f0f0f0' : 'white'
            }}
            disabled={!!selectedTable}
          >
            <option value="">Selecciona mesa</option>
            {tables.map(table => (
              <option key={table} value={table}>Mesa {table}</option>
            ))}
          </select>
          {selectedTable && (
            <button
              onClick={requestTableChange}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
            >
              Cambiar
            </button>
          )}
        </div>
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-medium mb-4" style={{ color: '#3d819d' }}>Confirmar Cambio</h3>
            <p className="text-gray-600 mb-6">Al cambiar de mesa se borrará el pedido actual</p>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1" style={{ color: '#3d819d' }}>Nueva Mesa</label>
              <select
                value={newTable}
                onChange={(e) => setNewTable(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition"
                style={{ borderColor: '#3d819d', '--tw-ring-color': '#3d819d' }}
              >
                <option value="">Selecciona mesa</option>
                {tables.map(table => (
                  <option key={table} value={table}>Mesa {table}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmTableChange}
                className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-colors"
                style={{ backgroundColor: '#3d819d' }}
                disabled={!newTable}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHeader;

// DONE