import React from 'react';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="flex -mb-px">
        <button
          onClick={() => onTabChange('comanda')}
          className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'comanda' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          style={{ borderColor: activeTab === 'comanda' ? '#3d819d' : undefined, color: activeTab === 'comanda' ? '#3d819d' : undefined }}
        >
          Comanda
        </button>
        <button
          onClick={() => onTabChange('pedidos')}
          className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'pedidos' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
          style={{ borderColor: activeTab === 'pedidos' ? '#3d819d' : undefined, color: activeTab === 'pedidos' ? '#3d819d' : undefined }}
        >
          Pedidos
        </button>
      </nav>
    </div>
  );
};

export default Tabs;