// Fashion Store Backend - Express + MongoDB + Multer
require('dotenv').config(); // Load environment variables first
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Uploads folder ensure karo
const fs = require('fs');
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log('✓ Created uploads directory');
}

app.use('/uploads', express.static('uploads')); // images serve karne ke liye

// MongoDB Models - simple schema
const Product = mongoose.model('Product', { name: String, price: Number, category: String, description: String, image: String });
const Category = mongoose.model('Category', { name: String, image: String });
const Order = mongoose.model('Order', { name: String, phone: String, address: String, city: String, pincode: String, items: Array, total: Number, date: { type: Date, default: Date.now } });

// Multer setup - image upload ke liye
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// Orders routes - generic /api/:type se PEHLE hone chahiye, warna /api/orders categories return karega
app.post('/api/orders', async (req, res) => {
  const order = await new Order(req.body).save();
  res.json(order);
});

app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

// Generic routes - products aur categories ke liye ek hi set
app.get('/api/:type', async (req, res) => {
  const Model = req.params.type === 'products' ? Product : Category;
  const data = await Model.find();
  res.json(data);
});

app.post('/api/:type', upload.single('image'), async (req, res) => {
  try {
    const Model = req.params.type === 'products' ? Product : Category;
    const data = { ...req.body };
    
    if (req.file) {
      data.image = '/uploads/' + req.file.filename;
    }
    
    const item = await new Model(data).save();
    console.log(`✓ ${req.params.type} added:`, item.name || item._id);
    res.json(item);
  } catch (error) {
    console.error('✗ Error adding item:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/:type/:id', async (req, res) => {
  const Model = req.params.type === 'products' ? Product : Category;
  await Model.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// MongoDB connection - try Atlas first, then local
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/garimaa_jewellers';

console.log('🔄 Attempting MongoDB connection...');
console.log('📍 Connection URI:', mongoURI.includes('mongodb.net') ? 'Using MongoDB Atlas (Cloud)' : 'Using Local MongoDB');

mongoose.connect(mongoURI, { 
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(async () => {
    console.log('\n✓✓✓ MongoDB connected successfully! ✓✓✓');
    console.log('✓ Database ready. Use admin panel to add products and categories.');
    
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`\n✓ Server running on http://localhost:${PORT}`);
      console.log('✓ Frontend URL: http://localhost:5173');
      console.log('✓ Admin Panel: http://localhost:5173/admin\n');
    });
  })
  .catch(err => {
    console.error('\n✗ MongoDB Connection FAILED!\n');
    console.error('Error:', err.message);
    console.error('\n🔧 FIX OPTIONS:\n');
    console.error('Option 1: Install MongoDB locally');
    console.error('  - Windows: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/');
    console.error('  - Or use MongoDB community edition\n');
    console.error('Option 2: Fix MongoDB Atlas connection');
    console.error('  - Go to: https://www.mongodb.com/cloud/atlas');
    console.error('  - Login and check your cluster is running');
    console.error('  - Whitelist your IP address');
    console.error('  - Verify connection string in .env file\n');
    console.error('Option 3: Check internet connection\n');
    
    // Start server in demo mode (no database)
    console.log('⚠️  Starting server in DEMO MODE (no database)\n');
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`✓ Demo Server running on http://localhost:${PORT}`);
      console.log('⚠️  Database is NOT connected. Admin panel may not work.\n');
    });
  });
