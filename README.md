# AHM Ecommerce System

A full-stack ecommerce web application built with **Node.js**, **Express**, and **MySQL**. Features JWT authentication, role-based access control (customer/admin), product management, shopping cart, and order processing — all served with a vanilla HTML/CSS/JS frontend.

## Tech Stack

| Layer      | Technology                        |
| ---------- | --------------------------------- |
| Backend    | Node.js, Express.js v5            |
| Database   | MySQL (via XAMPP)                  |
| Frontend   | HTML, CSS, JavaScript (vanilla)   |
| Auth       | JWT (jsonwebtoken), bcrypt         |
| Other      | cors, dotenv, mysql2               |

## Project Structure

```
ahm-ecommerce-system/
├── config/
│   └── db.js               # MySQL connection pool
├── controllers/
│   ├── authController.js    # Register & login logic
│   ├── cartController.js    # Cart CRUD operations
│   ├── orderController.js   # Checkout & order history
│   └── productController.js # Product CRUD (admin-restricted)
├── middlewares/
│   └── authMiddleware.js    # JWT verification & admin guard
├── models/
│   ├── userModel.js         # User DB queries
│   ├── productModel.js      # Product DB queries
│   ├── cartModel.js         # Cart DB queries
│   └── orderModel.js        # Order DB queries
├── routes/
│   ├── authRoutes.js        # /api/auth/*
│   ├── productRoutes.js     # /api/products/*
│   ├── cartRoutes.js        # /api/cart/*
│   └── orderRoutes.js       # /api/orders/*
├── public/
│   ├── index.html           # Landing page
│   ├── css/style.css        # Global stylesheet
│   ├── js/main.js           # Frontend logic
│   └── views/
│       ├── login.html       # Login page
│       ├── register.html    # Registration page
│       ├── cart.html         # Shopping cart
│       ├── checkout.html    # Checkout page
│       ├── orders.html      # Order history
│       └── admin.html       # Admin dashboard
├── schema.sql               # Database table definitions
├── seed.sql                 # Sample/seed data
├── app.js                   # Express entry point
├── .env                     # Environment variables (not committed)
├── .gitignore
└── package.json
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or higher recommended)
- [XAMPP](https://www.apachefriends.org) (for MySQL server)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abdullah-Jabbar786/ahm-ecommerce-system.git
   cd ahm-ecommerce-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=ecommerce_db
   JWT_SECRET=your_secret_key_here
   ```

4. **Set up the database** — Start XAMPP and ensure MySQL is running, then import the schema and seed data:
   ```bash
   mysql -u root -p < schema.sql
   mysql -u root -p < seed.sql
   ```

5. **Start the server**
   ```bash
   node app.js
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

## API Endpoints

### Authentication — `/api/auth`

| Method | Endpoint    | Access | Description              |
| ------ | ----------- | ------ | ------------------------ |
| POST   | `/register` | Public | Register a new user      |
| POST   | `/login`    | Public | Login & receive JWT token|

### Products — `/api/products`

| Method | Endpoint | Access     | Description         |
| ------ | -------- | ---------- | ------------------- |
| GET    | `/`      | Public     | Get all products    |
| POST   | `/`      | Admin only | Add a new product   |
| DELETE | `/:id`   | Admin only | Delete a product    |

### Cart — `/api/cart` *(requires authentication)*

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| GET    | `/`      | View cart items          |
| POST   | `/`      | Add an item to cart      |
| DELETE | `/:id`   | Remove an item from cart |

### Orders — `/api/orders` *(requires authentication)*

| Method | Endpoint    | Description                    |
| ------ | ----------- | ------------------------------ |
| POST   | `/checkout` | Place an order from cart items |
| GET    | `/history`  | View past orders               |

### Test

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | `/api/test` | Health check endpoint |

## Database Schema

The MySQL database (`ecommerce_db`) consists of 6 tables:

| Table         | Description                                       |
| ------------- | ------------------------------------------------- |
| `users`       | Customer & admin accounts (role-based via ENUM)   |
| `categories`  | Product categories for filtering                  |
| `products`    | Product catalog (linked to categories)            |
| `cart_items`  | Active shopping cart items per user                |
| `orders`      | Order records with status tracking                |
| `order_items` | Individual items within each order (price snapshot)|

> See [`schema.sql`](schema.sql) for full table definitions and [`seed.sql`](seed.sql) for sample data.

## Features
- **User Authentication** — Register and login with hashed passwords (bcrypt) and JWT tokens
- **Role-Based Access** — Admin-only routes for product management
- **Product Catalog** — Browse products with category support
- **Shopping Cart** — Add, view, and remove items (persisted per user in DB)
- **Order Processing** — Checkout from cart with order history tracking
- **Admin Dashboard** — Dedicated admin panel for managing products
- **RESTful API** — Clean, well-structured API following REST conventions
- **Server-Side Rendering** — Static HTML pages served via Express

## License
This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).