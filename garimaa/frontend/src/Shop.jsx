// Shop page - main landing page with categories aur products
import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories, getImageUrl } from './api.js';
import { getCartCount } from './cartStore.js';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState(''); // selected category
  const [search, setSearch] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Data MongoDB se load karo
    fetchProducts().then(setProducts).catch(err => {
      console.error('Failed to load products:', err);
      alert('Backend is not running. Please start the backend server.');
    });
    fetchCategories().then(setCategories).catch(err => {
      console.error('Failed to load categories:', err);
    });
    setCartCount(getCartCount());
  }, []);

  // Filter aur search apply karo
  const filtered = products.filter(p => {
    const matchCategory = !filter || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <h1 className="logo" onClick={() => window.location.href = '/'}>✦ GARIMAA ✦</h1>
          <input 
            type="text" 
            placeholder="Search exquisite jewelry..." 
            className="search-box"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="cart-btn" onClick={() => window.location.href = '/cart'}>
            Cart ({cartCount})
          </button>
        </div>
      </nav>

      <div className="container">
        {/* Categories section */}
        <section className="section">
          <h2>Shop by Category</h2>
          <div className="categories-wrapper">
            <div className="categories">
              <div 
                className={`category-card ${!filter ? 'active' : ''}`}
                onClick={() => setFilter('')}
              >
                <div className="category-circle">
                  <span className="category-text">All</span>
                </div>
                <p>All Jewelry</p>
              </div>
              {categories.map(cat => (
                <div 
                  key={cat._id} 
                  className={`category-card ${filter === cat.name ? 'active' : ''}`}
                  onClick={() => setFilter(cat.name)}
                >
                  <img src={getImageUrl(cat.image)} alt={cat.name} className="category-circle" />
                  <p>{cat.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products grid */}
        <section className="section">
          <h2>All Products ({filtered.length})</h2>
          <div className="products-grid">
            {filtered.map(product => (
              <div 
                key={product._id} 
                className="product-card"
                onClick={() => window.location.href = `/product/${product._id}`}
              >
                <img src={getImageUrl(product.image)} alt={product.name} />
                <h3>{product.name}</h3>
                <p className="price">₹{product.price}</p>
                <p className="category-tag">{product.category}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
