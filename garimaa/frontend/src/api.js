// API helper - backend se baat karne ke liye
const API_URL = 'http://localhost:3001/api';

// Image path helper - "/uploads" se shuru ho to backend URL lagao
export const getImageUrl = (path) => {
  if (!path) return ''; // No placeholder, real images only
  if (path.startsWith('/uploads')) return 'http://localhost:3001' + path;
  return path;
};

// Products fetch - MongoDB se
export const fetchProducts = async () => {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error('Backend is not running');
  return await res.json();
};

// Categories fetch - MongoDB se
export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/categories`);
  if (!res.ok) throw new Error('Backend is not running');
  return await res.json();
};

// Order place karo
export const placeOrder = async (orderData) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return await res.json();
};

// Admin APIs
export const fetchOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return await res.json();
};

export const addItem = async (type, data) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });
    
    const res = await fetch(`${API_URL}/${type}`, {
      method: 'POST',
      body: formData
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Server error:', errorText);
      throw new Error(`Server returned ${res.status}: ${errorText}`);
    }
    
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Error in addItem:', error);
    throw error;
  }
};

export const deleteItem = async (type, id) => {
  const res = await fetch(`${API_URL}/${type}/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
};
