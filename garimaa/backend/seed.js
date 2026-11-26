// Database seed script with sample jewelry data
require('dotenv').config();
const mongoose = require('mongoose');

const Product = mongoose.model('Product', { name: String, price: Number, category: String, description: String, image: String });
const Category = mongoose.model('Category', { name: String, image: String });
const Order = mongoose.model('Order', { name: String, phone: String, address: String, city: String, pincode: String, items: Array, total: Number, date: Date });

const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/fashionstore';

// Sample jewelry categories
const sampleCategories = [
  { name: 'Rings', image: '/uploads/sample-rings.jpg' },
  { name: 'Necklaces', image: '/uploads/sample-necklaces.jpg' },
  { name: 'Earrings', image: '/uploads/sample-earrings.jpg' },
  { name: 'Bangles', image: '/uploads/sample-bangles.jpg' },
  { name: 'Bracelets', image: '/uploads/sample-bracelets.jpg' }
];

// Sample jewelry products
const sampleProducts = [
  { name: 'Diamond Solitaire Ring', price: 45000, category: 'Rings', description: 'Elegant 18K gold diamond solitaire ring with brilliant cut diamond', image: '/uploads/sample-ring-1.jpg' },
  { name: 'Gold Wedding Band', price: 25000, category: 'Rings', description: 'Classic 22K gold wedding band with traditional design', image: '/uploads/sample-ring-2.jpg' },
  { name: 'Pearl Necklace Set', price: 35000, category: 'Necklaces', description: 'Beautiful freshwater pearl necklace with matching earrings', image: '/uploads/sample-necklace-1.jpg' },
  { name: 'Gold Chain', price: 55000, category: 'Necklaces', description: 'Premium 22K gold chain with intricate design work', image: '/uploads/sample-necklace-2.jpg' },
  { name: 'Diamond Studs', price: 28000, category: 'Earrings', description: 'Sparkling diamond stud earrings in white gold setting', image: '/uploads/sample-earring-1.jpg' },
  { name: 'Kundan Bangles', price: 42000, category: 'Bangles', description: 'Traditional Kundan work bangles with precious stones', image: '/uploads/sample-bangle-1.jpg' }
];

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('✓ Connected to MongoDB');
    console.log('Clearing existing data...');
    
    await Product.deleteMany({});
    await Category.deleteMany({});
    await Order.deleteMany({});
    
    console.log('✓ Database cleared');
    console.log('Adding sample jewelry data...');
    
    // Add categories
    await Category.insertMany(sampleCategories);
    console.log(`✓ Added ${sampleCategories.length} categories`);
    
    // Add products
    await Product.insertMany(sampleProducts);
    console.log(`✓ Added ${sampleProducts.length} products`);
    
    console.log('\n✦ Database seeded successfully! ✦');
    console.log('\nNote: Images are placeholder paths.');
    console.log('Use admin panel to upload real jewelry images.\n');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('✗ Seed failed:', err.message);
    process.exit(1);
  });
