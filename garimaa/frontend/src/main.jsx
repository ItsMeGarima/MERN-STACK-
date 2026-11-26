// Main entry point - URL pathname se pages choose karenge (react-router nahi)
import React from 'react';
import ReactDOM from 'react-dom/client';
import Shop from './Shop.jsx';
import Product from './Product.jsx';
import Cart from './Cart.jsx';
import Admin from './Admin.jsx';
import './style.css';

function App() {
  const path = window.location.pathname;
  
  console.log('🔍 Current path:', path);
  console.log('📍 Rendering component for:', path);
  
  // URL se page decide karo
  if (path.startsWith('/product/')) {
    console.log('✅ Loading Product page');
    return <Product />;
  } else if (path === '/cart') {
    console.log('✅ Loading Cart page');
    return <Cart />;
  } else if (path === '/admin') {
    console.log('✅ Loading Admin page');
    return <Admin />;
  } else {
    console.log('✅ Loading Shop page');
    return <Shop />;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
