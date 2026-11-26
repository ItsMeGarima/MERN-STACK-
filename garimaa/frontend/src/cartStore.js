// Cart localStorage helper - Windows pe cart.js aur Cart.jsx conflict karega isliye cartStore.js naam rakha

export const getCart = () => {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product, size) => {
  const cart = getCart();
  const existing = cart.find(item => item._id === product._id && item.size === size);
  
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, size, quantity: 1 });
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const updateQuantity = (id, size, quantity) => {
  const cart = getCart();
  const item = cart.find(item => item._id === id && item.size === size);
  
  if (item) {
    if (quantity <= 0) {
      // Remove item
      const updated = cart.filter(item => !(item._id === id && item.size === size));
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    }
    item.quantity = quantity;
  }
  
  localStorage.setItem('cart', JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem('cart');
  return [];
};

export const getCartCount = () => {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
};
