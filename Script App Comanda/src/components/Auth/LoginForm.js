import React, { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [selectedUser, setSelectedUser] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [users] = useState([
    { id: 1, username: 'Juan', password: '7294', name: 'Juan' },
    { id: 2, username: 'Santiago', password: '63945', name: 'Santiago' },
    { id: 3, username: 'Sofia', password: '15023', name: 'Sofia' },
    { id: 4, username: 'Julian', password: '82476', name: 'Julian' },
    { id: 5, username: 'Invitado', password: '35790', name: 'Invitado' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find(u => u.username === selectedUser);
    if (user && user.password === password) {
      onLogin(user);
    } else {
      alert('Contraseña incorrecta para el usuario seleccionado');
    }
  };

  const handleUserChange = (e) => {
    setSelectedUser(e.target.value);
    setPassword('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#3d819d' }}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6" style={{ color: '#3d819d' }}>Inicio de Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" style={{ color: '#3d819d' }} htmlFor="user">
              Usuario
            </label>
            <select
              id="user"
              value={selectedUser}
              onChange={handleUserChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
              style={{ borderColor: '#3d819d', '--tw-ring-color': '#3d819d' }}
              required
            >
              <option value="">Selecciona un usuario</option>
              {users.map(user => (
                <option key={user.id} value={user.username}>{user.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2" style={{ color: '#3d819d' }} htmlFor="password">
              Contraseña
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 transition"
                style={{ borderColor: '#3d819d', '--tw-ring-color': '#3d819d' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5" style={{ color: '#3d819d' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" style={{ color: '#3d819d' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white py-2 px-4 rounded-lg hover:opacity-90 transition-colors"
            style={{ backgroundColor: '#3d819d' }}
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;