# MERN VIVA - Quick Setup & Understanding Guide

## ⚡ QUICK START (Do This First!)

### Step 1: Start Backend
```
cd backend
npm install
npm start
```
Backend runs on: **http://localhost:3001**

### Step 2: Start Frontend (in a NEW terminal)
```
cd frontend
npm install
npm run dev
```
Frontend runs on: **http://localhost:5173**

### Step 3: Access the App
- **Shop**: http://localhost:5173
- **Admin**: http://localhost:5173/admin

---

## 🗄️ Database Setup

Your project uses **MongoDB**. Choose one option:

### Option A: Use MongoDB Atlas (Cloud) - RECOMMENDED
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Get connection string from "Connect" button
5. Update `.env` file with your connection string:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/garimaa_jewellers?retryWrites=true&w=majority
   ```
6. Restart backend

### Option B: Use Local MongoDB (If installed)
1. Install MongoDB from: https://www.mongodb.com/try/download/community
2. Start MongoDB service
3. Backend will automatically connect to `mongodb://127.0.0.1:27017`

### If Database Connection Fails:
Backend will start in **DEMO MODE** (without database). Frontend will work but admin panel won't save data.

---

## 🏗️ Project Structure

```
garimaa/
├── backend/              # Node.js + Express + MongoDB
│   ├── server.js         # Main backend file (API endpoints)
│   ├── seed.js           # Add sample data to database
│   ├── .env              # Database connection & port
│   └── uploads/          # Uploaded images stored here
│
├── frontend/             # React + Vite
│   └── src/
│       ├── main.jsx      # App entry point & routing
│       ├── Shop.jsx      # Main product page
│       ├── Product.jsx   # Product detail page
│       ├── Cart.jsx      # Shopping cart & checkout
│       ├── Admin.jsx     # Admin panel
│       ├── api.js        # Backend API calls
│       ├── cartStore.js  # Cart management (localStorage)
│       └── style.css     # Design
```

---

## 📊 How Data Flows

```
User clicks product (Shop.jsx)
            ↓
React fetches from API (api.js)
            ↓
Backend Express server (server.js)
            ↓
MongoDB database stores data
            ↓
Backend sends data back
            ↓
React displays on page
```

---

## 🔌 API Endpoints (Backend)

Your backend has these API routes:

```
GET  /api/products        → Get all products
POST /api/products        → Add new product (needs image)
DELETE /api/products/:id  → Delete product

GET  /api/categories      → Get all categories
POST /api/categories      → Add new category (needs image)
DELETE /api/categories/:id → Delete category

POST /api/orders          → Place order
GET  /api/orders          → Get all orders
```

---

## 🛒 Cart & Shopping Flow

### How Cart Works:
1. Products stored in browser's **localStorage** (not database)
2. When user adds to cart → saves in browser memory
3. Cart persists even after page refresh
4. When checkout → order sent to backend & saved in MongoDB

### Shopping Steps:
1. Browse products on Shop page
2. Click product → see details
3. Select size & click "Add to Cart"
4. Go to cart → update quantities
5. Fill delivery details
6. Click "Place Order" → saves to database
7. Order confirmation shown

---

## 👨‍💼 Admin Panel Features

Access at: **http://localhost:5173/admin**

### Available Operations:
- ✅ **View Orders** - See all customer orders
- ✅ **View Products** - List all products
- ✅ **View Categories** - List all categories
- ✅ **Add Category** - Create new category with image
- ✅ **Add Product** - Create new product with all details & image
- ✅ **Delete Products** - Remove products
- ✅ **Delete Categories** - Remove categories

---

## ❌ Common Issues & Fixes

### "Cannot connect to backend" / "ERR_CONNECTION_REFUSED"
**Problem**: Backend is not running
**Fix**: 
```
cd backend
npm start
```

### "Products not loading" / Blank page
**Problem**: Database not connected
**Fix**:
1. Check if MongoDB is running
2. If using Atlas, check internet connection
3. Verify connection string in `.env`

### "Image upload fails"
**Problem**: Backend not running or uploads folder missing
**Fix**:
1. Backend creates `/backend/uploads/` folder automatically
2. Make sure backend is running
3. Check file permissions

### "Cannot find modules"
**Problem**: Dependencies not installed
**Fix**:
```
cd backend
npm install

cd ../frontend
npm install
```

---

## 🚀 For Your VIVA

### Topics to Understand:

1. **What is MERN?**
   - MongoDB (database)
   - Express (backend framework)
   - React (frontend framework)
   - Node.js (JavaScript runtime)

2. **How does your project work?**
   - Backend API serves data
   - Frontend React components display UI
   - MongoDB stores data permanently
   - localStorage stores cart temporarily

3. **API Communication**
   - Frontend calls backend APIs using `fetch()`
   - Backend returns JSON data
   - Frontend displays data

4. **Image Handling**
   - User uploads image from admin panel
   - Multer saves to `/backend/uploads/`
   - Backend stores image path in MongoDB
   - Frontend displays image using path

5. **Shopping Cart**
   - Stored in browser's localStorage
   - Survives page refresh
   - When order placed → sent to backend

6. **Database**
   - MongoDB stores: Products, Categories, Orders
   - Collections have flexible schema
   - Each document is like a JSON object

---

## 📝 Project Features

- ✅ Product browsing with categories
- ✅ Product search functionality
- ✅ Shopping cart (browser storage)
- ✅ Order placement
- ✅ Admin panel to manage inventory
- ✅ Image upload for products & categories
- ✅ Order tracking
- ✅ Responsive design
- ✅ Luxury jewelry theme

---

## 🔧 Useful Commands

```
# Backend
cd backend
npm install          # Install dependencies
npm start            # Start server
npm run seed         # Add sample data

# Frontend
cd frontend
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production

# Clean up
Get-Process node | Stop-Process -Force  # Stop all Node servers
```

---

## ✅ Verification Checklist

Before your VIVA, check:

- [ ] Backend runs on http://localhost:3001 without errors
- [ ] Frontend runs on http://localhost:5173
- [ ] Can view products on Shop page
- [ ] Can view product details
- [ ] Can add products to cart
- [ ] Can place orders
- [ ] Admin panel loads
- [ ] Can add categories from admin panel
- [ ] Can add products from admin panel
- [ ] Can see orders in admin panel
- [ ] Images upload and display correctly

---

## 📚 Learning Resources

- **MERN Stack**: https://www.mongodb.com/mern-stack
- **Express.js**: https://expressjs.com/
- **React**: https://react.dev/
- **MongoDB**: https://docs.mongodb.com/
- **Mongoose**: https://mongoosejs.com/

---

**Good luck with your VIVA! 🎯**
