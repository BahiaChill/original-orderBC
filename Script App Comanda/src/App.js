import React, { useState } from 'react';
import LoginForm from './components/Auth/LoginForm';
import Header from './components/Layout/Header';
import Tabs from './components/Layout/Tabs';
import OrderHeader from './components/Orders/OrderHeader';
import OrderForm from './components/Orders/OrderForm';
import OrderList from './components/Orders/OrderList';
import OrderSummary from './components/Orders/OrderSummary';
import OrderHistory from './components/Orders/OrderHistory';
import { users, products, tables } from './mock/data';

const App = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('comanda');
  const [currentOrders, setCurrentOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedTable, setSelectedTable] = useState('');

  const handleLogin = (credentials) => {
    const foundUser = users.find(
      u => u.username === credentials.username && u.password === credentials.password
    );
    if (foundUser) {
      setUser(foundUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentOrders([]);
    setOrderHistory([]);
    setEditingOrder(null);
    setSelectedTable('');
  };

  const handleTableChange = (table) => {
    setCurrentOrders([]);
    setEditingOrder(null);
    setSelectedTable(table);
  };

  const addOrderItem = (item) => {
    setCurrentOrders([...currentOrders, item]);
    setEditingOrder(null);
  };

  const updateOrderItem = (updatedItem) => {
    setCurrentOrders(currentOrders.map(o => o.id === updatedItem.id ? updatedItem : o));
    setEditingOrder(null);
  };

  const removeOrderItem = (id) => {
    setCurrentOrders(currentOrders.filter(o => o.id !== id));
    if (editingOrder?.id === id) {
      setEditingOrder(null);
    }
  };

  const sendCurrentOrder = () => {
    if (!selectedTable || currentOrders.length === 0) return;

    const now = new Date();
    const newOrder = {
      date: now.toLocaleDateString(),
      time: now.toLocaleTimeString(),
      user: user.name,
      table: selectedTable,
      items: [...currentOrders]
    };

    setOrderHistory([...orderHistory, newOrder]);
    setCurrentOrders([]);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fcf9f3' }}>
      <Header user={user} onLogout={handleLogout} />
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'comanda' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
            <div className="lg:col-span-1">
              <OrderHeader
                tables={tables}
                selectedTable={selectedTable}
                onTableChange={handleTableChange}
                currentOrders={currentOrders}
              />
              <OrderForm
                products={products.filter(p => p.stock > 0)}
                selectedTable={selectedTable}
                onAddItem={addOrderItem}
                onUpdateItem={updateOrderItem}
                editingItem={editingOrder}
                onCancelEdit={() => setEditingOrder(null)}
              />
              <OrderSummary 
                orders={currentOrders} 
                onSendOrder={sendCurrentOrder}
                hasItems={currentOrders.length > 0}
              />
            </div>
            <div className="lg:col-span-2">
              <OrderList
                orders={currentOrders}
                onEditItem={setEditingOrder}
                onRemoveItem={removeOrderItem}
              />
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <OrderHistory orders={orderHistory} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

// DONE