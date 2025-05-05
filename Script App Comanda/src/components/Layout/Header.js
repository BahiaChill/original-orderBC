import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <header className="shadow-sm" style={{ backgroundColor: '#3d819d' }}>
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Bahia Chill</h1>
        {user && (
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-white">Mesero: {user.name}</span>
            <button
              onClick={onLogout}
              className="px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors text-sm"
            >
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;