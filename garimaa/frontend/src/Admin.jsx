// Admin panel - manage products/categories and view orders
import React, { useState, useEffect } from 'react';
import { fetchOrders, fetchProducts, fetchCategories, addItem, deleteItem, getImageUrl } from './api.js';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    loadData();
  }, []);

  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [ord, prod, cat] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
        fetchCategories()
      ]);
      // Sirf arrays hi set karo, warna .map() crash karke page blank kar deta hai
      setOrders(Array.isArray(ord) ? ord : []);
      setProducts(Array.isArray(prod) ? prod : []);
      setCategories(Array.isArray(cat) ? cat : []);
      setError('');
    } catch (err) {
      console.error('Admin data load failed:', err);
      setError('Backend se data nahi aa raha. Check karo ki backend (port 3001) chal raha hai.');
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    try {
      const data = { name: form.name.value, image: form.image.files[0] };
      const result = await addItem('categories', data);
      
      if (result && result._id) {
        alert('Category added successfully!');
        await loadData();
        form.reset();
      } else {
        throw new Error('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Error adding category. Please check if backend is running and try again.');
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    
    try {
      const data = {
        name: form.name.value,
        price: form.price.value,
        category: form.category.value,
        description: form.description.value,
        image: form.image.files[0]
      };
      const result = await addItem('products', data);
      
      if (result && result._id) {
        alert('Product added successfully!');
        await loadData();
        form.reset();
      } else {
        throw new Error('Failed to add product');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please check if backend is running and try again.');
    }
  };

  const handleDelete = async (type, id) => {
    if (!confirm('Delete karna hai?')) return;
    await deleteItem(type, id);
    alert('Deleted!');
    loadData();
  };

  return (
    <div>
      <nav className="navbar">
        <div className="container">
          <h1 className="logo">✦ GARIMAA ADMIN ✦</h1>
        </div>
      </nav>

      <div className="container">
        {error && <p style={{ color: 'red', padding: '1rem 0' }}>{error}</p>}
        {/* Tabs */}
        <div className="admin-tabs">
          <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</button>
          <button className={activeTab === 'products' ? 'active' : ''} onClick={() => setActiveTab('products')}>Products</button>
          <button className={activeTab === 'categories' ? 'active' : ''} onClick={() => setActiveTab('categories')}>Categories</button>
          <button className={activeTab === 'add' ? 'active' : ''} onClick={() => setActiveTab('add')}>Add New</button>
        </div>

        {/* Orders tab */}
        {activeTab === 'orders' && (
          <div className="admin-section">
            <h2>Orders ({orders.length})</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Items</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}, {order.city} - {order.pincode}</td>
                    <td>{(order.items || []).length} items</td>
                    <td>₹{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Products tab */}
        {activeTab === 'products' && (
          <div className="admin-section">
            <h2>Products ({products.length})</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>₹{product.price}</td>
                    <td>{product.category}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete('products', product._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Categories tab */}
        {activeTab === 'categories' && (
          <div className="admin-section">
            <h2>Categories ({categories.length})</h2>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(cat => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td>
                      <button className="btn-delete" onClick={() => handleDelete('categories', cat._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Add new tab */}
        {activeTab === 'add' && (
          <div className="admin-section">
            <div className="admin-forms">
              {/* Add Category form */}
              <div className="admin-form">
                <h2>Add Category</h2>
                <form onSubmit={handleAddCategory}>
                  <input type="text" name="name" placeholder="Category Name" required />
                  <input type="file" name="image" accept="image/*" required />
                  <button type="submit" className="btn btn-primary">Add Category</button>
                </form>
              </div>

              {/* Add Product form */}
              <div className="admin-form">
                <h2>Add Product</h2>
                <form onSubmit={handleAddProduct}>
                  <input type="text" name="name" placeholder="Product Name" required />
                  <input type="number" name="price" placeholder="Price" required />
                  <select name="category" required>
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                  <textarea name="description" placeholder="Description" required></textarea>
                  <input type="file" name="image" accept="image/*" required />
                  <button type="submit" className="btn btn-primary">Add Product</button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
