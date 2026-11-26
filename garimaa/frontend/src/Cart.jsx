// Cart page - items dikhao aur order place karo
import React, { useState, useEffect } from 'react';
import { getCart, updateQuantity, clearCart } from './cartStore.js';
import { placeOrder, getImageUrl } from './api.js';

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', address: '', city: '', pincode: '' });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleQuantityChange = (id, size, newQty) => {
    const updated = updateQuantity(id, size, newQty);
    setCart(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (form.phone.length !== 10 || !/^\d+$/.test(form.phone)) {
      alert('Mobile number must be 10 digits');
      return;
    }
    if (form.pincode.length !== 6 || !/^\d+$/.test(form.pincode)) {
      alert('Pincode must be 6 digits');
      return;
    }
    
    // Order data ready karo
    const orderData = {
      ...form,
      items: cart.map(item => ({ 
        name: item.name, 
        size: item.size, 
        quantity: item.quantity, 
        price: item.price 
      })),
      total
    };
    
    try {
      await placeOrder(orderData);
      clearCart();
      setOrderPlaced(true);
    } catch (err) {
      alert('Order placement failed. Backend check karo.');
    }
  };

  if (orderPlaced) {
    return (
      <div className="order-success">
        <div className="success-box">
          <h1>Order Placed Successfully!</h1>
          <p>Your order will be delivered via Cash on Delivery</p>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div>
        <nav className="navbar">
          <div className="container">
            <h1 className="logo" onClick={() => window.location.href = '/'}>✦ GARIMAA ✦</h1>
          </div>
        </nav>
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <button className="btn btn-primary" onClick={() => window.location.href = '/'}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo" onClick={() => window.location.href = '/'}>✦ GARIMAA ✦</h1>
        </div>
      </nav>

      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-layout">
          {/* Cart items */}
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id + item.size} className="cart-item">
                <img src={getImageUrl(item.image)} alt={item.name} />
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p>Size: {item.size}</p>
                  <p className="price">₹{item.price}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(item._id, item.size, item.quantity - 1)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(item._id, item.size, item.quantity + 1)}>+</button>
                </div>
                <p className="item-total">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          {/* Order form */}
          <div className="order-form-box">
            <h2>Delivery Details</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Full Name" 
                required
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
              <input 
                type="tel" 
                placeholder="Mobile Number (10 digits)" 
                required
                value={form.phone}
                onChange={(e) => setForm({...form, phone: e.target.value})}
              />
              <textarea 
                placeholder="Address" 
                required
                value={form.address}
                onChange={(e) => setForm({...form, address: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="City" 
                required
                value={form.city}
                onChange={(e) => setForm({...form, city: e.target.value})}
              />
              <input 
                type="text" 
                placeholder="Pincode (6 digits)" 
                required
                value={form.pincode}
                onChange={(e) => setForm({...form, pincode: e.target.value})}
              />
              
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Items: {cart.length}</p>
                <p className="total">Total: ₹{total}</p>
                <p className="cod">Cash on Delivery</p>
              </div>
              
              <button type="submit" className="btn btn-primary btn-full">
                Place Order
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
