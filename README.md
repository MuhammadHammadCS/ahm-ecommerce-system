# 🛒 AHM E-Commerce System

> A **production-ready full-stack e-commerce platform** featuring secure authentication, comprehensive product management, and seamless shopping experience. Built with modern web technologies for scalability and performance.

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Docs](#-api-endpoints) • [Database Schema](#-database-schema)

</div>

---

## 📸 Project Highlights

- 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
- 👥 **Role-Based Access Control** - Separate customer and admin functionalities
- 🛍️ **Dynamic Product Catalog** - Browse, filter, and manage products with categories
- 🛒 **Persistent Shopping Cart** - Add/remove items with real-time database sync
- 📦 **Order Management** - Complete checkout process with order history tracking
- 📊 **Admin Dashboard** - Dedicated panel for product CRUD operations
- 🎨 **Responsive UI** - Clean, intuitive frontend with smooth user experience
- 🔗 **RESTful API** - Well-structured API following REST conventions

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Backend** | Node.js, Express.js | 18+, v5 |
| **Database** | MySQL | 5.7+ (XAMPP) |
| **Frontend** | HTML5, CSS3, Vanilla JS | ES6+ |
| **Authentication** | JWT, bcrypt | jsonwebtoken, bcrypt |
| **Middleware** | CORS, dotenv | - |
| **Dependencies** | mysql2, express | Latest |

---

## 📁 Project Structure

```
ahm-ecommerce-system/
│
├── 📂 assets/
│   └── graphics/                 # Static images & resources
│
├── 📂 config/
│   └── db.js                     # MySQL connection pool configuration
│
├── 📂 controllers/               # Business logic for each feature
│   ├── authController.js         # User registration & login
│   ├── cartController.js         # Shopping cart operations
│   ├── contactController.js      # Contact form handling
│   ├── orderController.js        # Order checkout & history
│   └── productController.js      # Product CRUD (admin-only)
│
├── 📂 middlewares/
│   └── authMiddleware.js         # JWT verification & admin guard
│
├── 📂 models/                    # Database query functions
│   ├── userModel.js              # User-related DB queries
│   ├── productModel.js           # Product queries with pagination
│   ├── cartModel.js              # Cart item management
│   └── orderModel.js             # Order & order_items queries
│
├── 📂 routes/                    # API endpoint definitions
│   ├── authRoutes.js             # /api/auth/* (register, login)
│   ├── productRoutes.js          # /api/products/* (CRUD)
│   ├── cartRoutes.js             # /api/cart/* (cart operations)
│   ├── orderRoutes.js            # /api/orders/* (checkout, history)
│   └── contactRoutes.js          # /api/contact/* (contact form)
│
├── 📂 public/                    # Frontend assets & HTML views
│   ├── index.html                # Landing page
│   ├── css/style.css             # Global stylesheet
│   ├── js/main.js                # Frontend JavaScript
│   └── 📂 views/                 # Individual page templates
│       ├── about.html
│       ├── admin.html            # Admin panel
│       ├── cart.html             # Shopping cart page
│       ├── checkout.html         # Order placement
│       ├── contact.html          # Contact form
│       ├── login.html
│       ├── orders.html           # Order history
│       └── register.html
│
├── 📄 schema.sql                 # Database table definitions
├── 📄 seed.sql                   # Sample data for development
├── 📄 init.js                    # Database initialization script
├── 📄 explainer.md               # Development documentation
├── 📄 app.js                     # Express server entry point
├── 📄 .env.example               # Environment variables template
├── 📄 .gitignore                 # Git ignore rules
└── 📄 package.json               # Dependencies & scripts

```

---

## ✨ Features

### 🔐 JWT Authentication
- Secure token-based authentication
- Passwords hashed with bcrypt (10 rounds)
- Token expiration for security
- Registration and login endpoints

### 👥 Role-Based Access Control
- **Customer Role:** Browse products, manage cart, place orders
- **Admin Role:** Add/delete products, view all orders
- Middleware-based authorization

### 🛍️ Product Catalog
- Browse all products with pagination
- Filter by categories
- Search functionality
- Admin-only product management

### 🛒 Shopping Cart System
- Persistent cart stored in database per user
- Real-time quantity updates
- Add/remove items functionality
- Cart total calculation

### 📦 Order Management
- Complete order history per user
- Order status tracking
- Price snapshot captured at purchase time
- Order details with line items

### 📊 Admin Dashboard
- Dedicated admin panel
- Product management interface
- Order overview
- User management capabilities

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher ([Download](https://nodejs.org))
- **XAMPP** or MySQL 5.7+ ([Download XAMPP](https://www.apachefriends.org))
- **Git** for version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MuhammadHammadCS/ahm-ecommerce-system.git
   cd ahm-ecommerce-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   
   Create a `.env` file in the project root:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ecommerce_db
   JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
   ```

4. **Set Up Database**
   
   - Start XAMPP and enable MySQL
   - Run the initialization script:
     ```bash
     node init.js
     ```
     This will create the database and tables automatically

5. **Start the Server**
   ```bash
   npm start
   ```
   
   Server will be running at `http://localhost:3000`

6. **Access the Application**
   
   Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 📡 API Endpoints

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/register` | Public | Register a new user account |
| `POST` | `/login` | Public | Login & receive JWT token |

**Register Example:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

**Login Example:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securePassword123"
  }'
```

---

### 📦 Products (`/api/products`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `GET` | `/` | Public | Get all products with pagination |
| `POST` | `/` | Admin | Add a new product |
| `DELETE` | `/:id` | Admin | Delete a product |

**Get Products:**
```bash
curl http://localhost:3000/api/products
```

**Add Product (Admin Only):**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "category_id": 1,
    "price": 999.99,
    "stock": 10,
    "description": "High-performance laptop"
  }'
```

---

### 🛒 Shopping Cart (`/api/cart`)
*Requires authentication*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | View all cart items for user |
| `POST` | `/` | Add item to cart |
| `DELETE` | `/:id` | Remove item from cart |

**View Cart:**
```bash
curl http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Add to Cart:**
```bash
curl -X POST http://localhost:3000/api/cart \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1,
    "quantity": 2
  }'
```

**Remove from Cart:**
```bash
curl -X DELETE http://localhost:3000/api/cart/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 📋 Orders (`/api/orders`)
*Requires authentication*

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/checkout` | Place an order from cart |
| `GET` | `/history` | View user's order history |

**Checkout:**
```bash
curl -X POST http://localhost:3000/api/orders/checkout \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json"
```

**Order History:**
```bash
curl http://localhost:3000/api/orders/history \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

### 📧 Contact (`/api/contact`)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| `POST` | `/` | Public | Submit contact form |

---

## 🗄️ Database Schema

**Database Name:** `ecommerce_db`

### Tables Overview

| Table | Purpose | Key Columns |
|-------|---------|-------------|
| **users** | User accounts | id, name, email, password, role, created_at |
| **categories** | Product categories | id, name, description |
| **products** | Product catalog | id, name, category_id, price, stock, description |
| **cart_items** | Active shopping carts | id, user_id, product_id, quantity |
| **orders** | Order records | id, user_id, total_price, status, created_at |
| **order_items** | Order line items | id, order_id, product_id, quantity, price |

**View full schema:**
- See [`schema.sql`](schema.sql) for complete table definitions
- See [`seed.sql`](seed.sql) for sample data

---

## 🔐 Security Features

- ✅ **Password Hashing** - bcrypt with 10 salt rounds
- ✅ **JWT Tokens** - Secure token-based authentication
- ✅ **SQL Injection Prevention** - Parameterized queries
- ✅ **CORS Protection** - Cross-origin resource sharing controlled
- ✅ **Admin Authorization** - Role-based middleware protection
- ✅ **Environment Variables** - Sensitive data in .env file

---

## 📝 Environment Variables

Create a `.env` file with these variables:

```env
# Server Configuration
PORT=3000                              # Server port

# Database Configuration
DB_HOST=localhost                      # MySQL host
DB_USER=root                           # MySQL username
DB_PASSWORD=                           # MySQL password (empty by default in XAMPP)
DB_NAME=ecommerce_db                   # Database name

# JWT Configuration
JWT_SECRET=your_secret_key_here        # Secret key for JWT signing (change in production!)
```

⚠️ **Important:** Never commit `.env` file to version control. Use `.env.example` as a template.

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack application development
- ✅ RESTful API design principles
- ✅ Database design and SQL queries
- ✅ Authentication and authorization patterns
- ✅ Frontend-backend integration
- ✅ Error handling and validation
- ✅ Code organization and MVC architecture
- ✅ Security best practices

---

## 📂 Additional Documentation

- **`explainer.md`** - Detailed development decisions and architectural notes
- **`schema.sql`** - Complete database schema definitions
- **`seed.sql`** - Sample data for testing

---

## 📜 License

This project is licensed under the **ISC License** - see [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 💡 Future Enhancements

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications for order updates
- [ ] Product reviews and ratings system
- [ ] Wishlist functionality
- [ ] Advanced search and filtering
- [ ] Analytics dashboard for admins
- [ ] Mobile app version
- [ ] Two-factor authentication

---

<div align="center">

**Built with ❤️ by Muhammad Hammad**

[⬆ back to top](#-ahm-e-commerce-system)

</div>
