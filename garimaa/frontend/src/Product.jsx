// Product detail page - size select aur "Add to Cart"
import React, { useState, useEffect } from 'react';
import { fetchProducts, getImageUrl } from './api.js';
import { addToCart } from './cartStore.js';

export default function Product() {
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [size, setSize] = useState('M');
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    // URL se product ID nikalo
    const id = window.location.pathname.split('/').pop();
    
    fetchProducts().then(products => {
      const current = products.find(p => p._id === id);
      if (!current) {
        alert('Product not found');
        window.location.href = '/';
        return;
      }
      setProduct(current);
      
      // Related products - same category ke 4 products
      const similar = products
        .filter(p => p.category === current.category && p._id !== current._id)
        .slice(0, 4);
      setRelated(similar);
    }).catch(err => {
      console.error('Failed to load product:', err);
      alert('Backend is not running. Please start the backend server.');
      window.location.href = '/';
    });
  }, []);

  if (!product) return <div className="loading">Loading...</div>;

  const handleAddToCart = () => {
    addToCart(product, size);
    alert(`${product.name} (Size: ${size}) added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, size);
    window.location.href = '/cart';
  };

  return (
    <div>
      {/* Simple navbar */}
      <nav className="navbar">
        <div className="container">
          <h1 className="logo" onClick={() => window.location.href = '/'}>✦ GARIMAA ✦</h1>
          <button className="cart-btn" onClick={() => window.location.href = '/cart'}>
            Cart
          </button>
        </div>
      </nav>

      <div className="container">
        {/* Product details */}
        <div className="product-detail">
          <div className="product-image-large">
            <img src={getImageUrl(product.image)} alt={product.name} />
          </div>
          
          <div className="product-info">
            <h1>{product.name}</h1>
            <p className="price-large">₹{product.price}</p>
            <p className="description">{product.description}</p>
            
            {/* Size selection */}
            <div className="size-section">
              <h3>Select Size</h3>
              <div className="sizes">
                {sizes.map(s => (
                  <button 
                    key={s}
                    className={`size-btn ${size === s ? 'active' : ''}`}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="action-buttons">
              <button className="btn btn-secondary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button className="btn btn-primary" onClick={handleBuyNow}>
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* You may also like */}
        {related.length > 0 && (
          <section className="section">
            <h2>You May Also Like</h2>
            <div className="products-grid">
              {related.map(item => (
                <div 
                  key={item._id}
                  className="product-card"
                  onClick={() => window.location.href = `/product/${item._id}`}
                >
                  <img src={getImageUrl(item.image)} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p className="price">₹{item.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
