# E-Commerce Project - Developer Explainer Log

This file documents the coding choices and changes made throughout the project phases for your review.

## Phase 1 & 2: Folder Structure and Database Schema
- **Folder Structure**: Adopted an MVC (Model-View-Controller) structure to ensure modularity. Code logic is separated into controllers, database queries into models, and route definitions into routes.
- **Database Schema**: Designed an MVP-friendly relational database schema.
    - Used `ENUM` for user roles to easily distinguish customers from admins.
    - Designed `cart_items` for persistent cart storage.
    - Ensured `order_items` captures the `price` at the moment of checkout, maintaining historical accuracy if product prices change later.

## Phase 3: Project Scaffold
- **npm init**: Initialized a Node.js project to create `package.json` for managing dependencies.
- **Dependencies Installed**:
    - `express`: Minimalist web framework for handling HTTP requests.
    - `mysql2`: A fast MySQL driver that supports Promises, allowing us to use modern `async/await` syntax for database queries instead of older callback functions.
    - `dotenv`: Used to securely manage environment variables (like database credentials and ports) so they aren't hardcoded in the source files.
    - `cors`: Cross-Origin Resource Sharing middleware. This ensures that our frontend can communicate with our API without browser security blocks (especially useful if the frontend and backend ever run on different domains/ports).
- **app.js**: Configured the entry point with essential middlewares (`express.json` to parse JSON bodies from requests, and `express.static` to serve our static HTML/CSS/JS from the `public` folder).
- **config/db.js**: Created a MySQL **connection pool** rather than a single connection. A pool is much better for production because it reuses connections, allowing the app to handle multiple concurrent users efficiently. We also exported the promise-based version (`pool.promise()`) so we can use `await pool.query()`.

## Phase 4: Authentication Feature
- **Security (`bcrypt` & `jsonwebtoken`)**: Used `bcrypt` to hash user passwords before saving them to the database. This is a critical security measure so plain-text passwords are never exposed. Used `jsonwebtoken` (JWT) to generate a secure token upon successful login. The client saves this token in `localStorage` and uses it to prove they are authenticated for future requests.
- **`models/userModel.js`**: Created a centralized file to handle database interactions specifically for users (`create`, `findByEmail`, `findById`). This keeps raw SQL queries neatly separated from the business logic controllers.
- **`controllers/authController.js`**: Implemented the business logic for `/register` and `/login`. Includes basic validation (checking if fields are empty), checking for duplicate emails, password hashing, comparing hashes during login, and issuing JWTs.
- **`routes/authRoutes.js`**: Cleanly mapped the HTTP POST requests (`/api/auth/register` and `/api/auth/login`) to their respective controller functions.
- **Frontend Views (`index.html`, `register.html`, `login.html`)**: Built beginner-friendly interfaces using Bootstrap to look professional out-of-the-box. Used the `fetch` API in plain JavaScript to send data to our Node.js backend instead of full page reloads, making it feel like a modern web application (SPA-like feel). On successful login, the token is saved in `localStorage` and the Navbar updates dynamically to show "Hello, User".

## Phase 5: Product Catalog & Premium UI Overhaul
- **Design Overhaul (`public/css/style.css`)**: Overrode standard Bootstrap styling with a highly premium, modern aesthetic. Introduced **glassmorphism** (frosted glass effect) on the navbar and cards, smooth hover micro-animations (cards lifting, product images subtly scaling), and a vibrant gradient hero section. We used the 'Outfit' Google Font for a clean, tech-forward look.
- **`models/productModel.js`**: Created a database wrapper to fetch products. Included an SQL `JOIN` to fetch the `category_name` alongside the product data so the frontend can display it beautifully.
- **`middlewares/authMiddleware.js`**: Added custom middleware to verify JWT tokens on incoming requests. This includes an `isAdmin` function to ensure that only authorized admins can trigger the "Add Product" API endpoint.
- **`seed.sql`**: Created a script to populate the database with initial categories and premium placeholder products (with Unsplash images) so the frontend UI can immediately demonstrate the new grid layout.

## Phase 6: Cart Management
- **Security First**: The cart system relies entirely on the `verifyToken` middleware. This means a user can only access or modify the cart associated with their specific `user_id` encoded in the JWT, preventing malicious users from modifying others' carts.
- **`models/cartModel.js`**: Created queries to join the `cart_items` table with the `products` table. This is an architectural choice so that when the frontend asks for the cart, it receives the product names and images immediately without having to make secondary requests.
- **Duplicate Logic (`cartController.js`)**: Instead of allowing duplicate rows for the same product in a user's cart, the controller checks if the item exists (`checkItemInCart`). If it does, it simply increments the `quantity` using `UPDATE`.
- **Frontend Integration (`cart.html` & `index.html`)**: Connected the "Add to Cart" button to the authenticated API. Built a new `cart.html` view that dynamically calculates the Subtotal in real-time by iterating over the fetched cart array and multiplying `price * quantity`.

## Phase 7: Checkout, Orders, & Enterprise UI Overhaul
- **UI Redesign (`style.css`)**: Completely overhauled the CSS to a "Stripe/Vercel" aesthetic. Shifted to a sophisticated monochromatic palette (deep charcoal `#0f172a`, crisp white, slate borders) with an Indigo (`#4f46e5`) accent. Swapped the font to 'Inter', increased padding, and added softer box-shadows to achieve a highly professional, enterprise-grade feel.
- **Transaction Handling**: In a massive production app, we would use SQL "Transactions" to ensure that if step 3 (inserting order items) fails, step 2 (creating the order) is rolled back. For this Node.js MVP, I will implement a basic sequential async/await flow. If an error happens midway, it will throw an error.
- **Backend (Node.js/Express) `models/orderModel.js`**: This is the most complex database logic yet. When a user checks out, we must:
  1. Calculate the total from the cart (Server-side, never trust frontend prices).
  2. `INSERT` a new row into `orders`.
  3. `INSERT` multiple rows into `order_items` using the cart data.
  4. `DELETE` the items from `cart_items` (emptying the cart).

## Phase 8: Admin Dashboard & Warm UI Revamp
- **Warm & Engaging UI**: You requested a less depressing, more eye-appealing interface. We switched to a vibrant "Coral/Peach" (`#FF7E67`) and warm off-white palette. To fix the "empty" feeling, we added a massive gradient Hero Section, a "Featured Categories" mock-section to fill the page layout, and a structured Footer. Buttons were made pill-shaped, and hover effects were amplified to feel lively.
- **`models/productModel.js`**: Added a `delete` method to allow removal of products.
- **Admin Dashboard (`admin.html`)**: Created a dedicated control panel for store owners. It dynamically lists all products in an HTML table, allows deleting items with a single click, and features a form to post new products. 
- **Security Validation**: The Admin dashboard is strictly protected. The frontend hides the "Admin" button from regular customers. Even if a customer navigates to `/views/admin.html`, their API requests to add or delete products will be blocked by the `isAdmin` backend middleware.

## Phase 9: Final Touches, Mass Seeding & UX Polishing
- **Massive Database Seeding (`seed.sql`)**: Completely rewrote the initial database seed script to inject 40+ high-quality products. We specifically targeted the perfume niche as requested: 15 top designer fragrances (Chanel, Dior, Creed, Tom Ford, YSL) and 15 popular dupe/Middle Eastern fragrances (Lattafa, Afnan, Armaf, Rasasi). We also added Daily Essentials, Tech, and Apparel to make the catalog massive and realistic.
- **UX Polish (Toast Notifications)**: Replaced the ugly, default browser `alert()` popups with elegant, modern "Toast" notifications that slide in at the bottom right of the screen. This required creating a custom utility function in `public/js/main.js` and leveraging Bootstrap's JS bundle. This drastically improves the "enterprise feel" of the application when adding items to the cart.
- **Content Alignment**: Updated the hardcoded "Featured Categories" on the homepage to perfectly align with the new Perfume-heavy database categories (Designer Perfumes, Dupe & Niche, Daily Essentials).

## Final Polish: AHM Luxury Rebrand & Database Stabilization
- **Database Stabilization**: The user's custom `seed.sql` failed in XAMPP because it deleted products without ensuring the `categories` existed. Re-wrote `seed.sql` to explicitly `TRUNCATE` all tables in the correct order (disabling foreign key checks first) and explicitly insert categories with `id`s to ensure bulletproof execution in XAMPP.
- **Image Accuracy Solution**: Finding permanent hotlinks to real perfume bottles is notoriously unreliable (images break or look repetitive). Implemented an elegant typographic image placeholder system (`placehold.co`) that generates stunning, high-res gold-and-black images displaying the EXACT name of the perfume (e.g., "Hawas Ice"). This guarantees 100% accuracy and never repeats.
- **AHM Luxury Rebrand**: 
  - Transformed the store name to **"AHM"**.
  - Completely rewrote the CSS (`style.css`) to adopt a high-end, luxury fashion aesthetic (Deep Black, Metallic Gold, and crisp White). 
  - Integrated the `Playfair Display` serif font for logos and headings, and `Montserrat` for body text to simulate brands like Tom Ford or Louis Vuitton.
  - Implemented extremely fluid, modern hover animations: buttons have a slight bounce and borders appear smoothly, while product images elegantly scale up by 15% on hover with a delayed easing curve.

## Phase 10: Figma-Driven UI, Dark Mode & Scroll Animations
- **Figma Alignment**: Adjusted the Hero Section text, featured categories, and overall structure to align with the provided Figma mockup.
- **Dark Mode Toggle**: 
  - Rewrote the entire `style.css` file to use CSS Custom Properties (Variables) like `--bg-main`, `--text-dark`, etc. 
  - Implemented a `data-theme="dark"` attribute selector that overrides the light mode variables seamlessly.
  - Added a responsive toggle button in the navigation bar that saves the user's preference to `localStorage`.
- **Milestone Counter (Odometer)**: 
  - Added a new "Join Our Growing Community" section to the homepage.
  - Built a custom Vanilla JS script using `IntersectionObserver` to trigger a high-performance, ease-out number counter (from 0 to 50,000) exactly when the user scrolls the section into view.
- **Cosmetics & Beauty Pivot (`seed.sql`)**: Removed the non-fitting Electronics and Apparel categories. Expanded the database to strictly focus on Designer Fragrances, Niche Fragrances, Luxury Cosmetics, and Daily Essentials, ensuring at least 5 beautifully placeholder-generated items per category.

## Phase 11: Admin Product Update & Local Image Serving

- **Admin Price & Stock Editing (`PUT /api/products/:id`)**:
  - **`models/productModel.js`**: Added a new `update(id, price, stock)` method that fires an SQL `UPDATE` query against the `products` table. The `id` is placed last in the parameterized query array to avoid SQL injection, matching the `WHERE id = ?` clause.
  - **`controllers/productController.js`**: Added `updateProduct` controller with server-side validation — it checks that both `price` and `stock` are present, are valid numbers, and are non-negative before calling the model. This prevents bad data from ever reaching the database.
  - **`routes/productRoutes.js`**: Registered a `PUT /:id` route protected by the `verifyToken` + `isAdmin` middleware chain. Only authenticated admin users can trigger this endpoint, matching the same security model as the `DELETE` route.
  - **Admin Dashboard (`admin.html`)**: Completely overhauled the product table. Each row now displays inline `<input>` fields pre-filled with the current `price` and `stock` values. A green **Update** button per row triggers a `fetch()` `PUT` call to the new endpoint. A small status label below the buttons shows `✓ Saved!` or `✗ Error` for 3 seconds, then disappears — removing the need for disruptive browser `alert()` calls. The **Delete** button now instantly removes the row from the DOM on success without a full page reload. The "Add Product" form also received an inline alert box replacing browser `alert()` popups for a professional UX.
  - **Category Dropdown**: Replaced the confusing raw number input for `category_id` in the "Add Product" form with a proper `<select>` dropdown listing all 4 categories by name.

- **Local Image Serving (`app.js`)**:
  - Added `const path = require('path')` to `app.js` and updated both static middleware calls to use `path.join(__dirname, ...)` (absolute paths) instead of relative strings. This ensures Express reliably resolves the `public` and `assets` directories regardless of where the `node` process is invoked from.
  - Registered `app.use('/assets', express.static(path.join(__dirname, 'assets')))` so that images placed in the `assets/graphics/` folder (e.g., `afnan_9pm.png`) are accessible at `/assets/graphics/afnan_9pm.png` via the browser without any extra configuration.
  - Updated `seed.sql` to point Afnan 9PM's `image_url` to the local path `/assets/graphics/afnan_9pm.png` instead of a placeholder URL, demonstrating that the system supports both remote URLs and locally-hosted product images.

## Phase 12: About Us Page & Navigation Polish

- **`public/views/about.html`**:
  - Created a dedicated About Us page that is fully integrated into the AHM design system — it uses the same CSS variable tokens (`--primary`, `--card-bg`, `--text-dark`, `--border-color`, etc.), the same `Playfair Display` + `Montserrat` font stack, and the same `data-theme` dark mode system as the rest of the project.
  - Features a **Hero section** introducing the team, a **Mission Strip** highlighting the tech stack (Node.js · Express · MySQL), architecture (MVC · REST API · JWT Auth), and project type.
  - Contains **3 developer cards** — one per team member (Abdullah, Hammad, Majid) — each featuring:
    - An animated avatar circle displaying the developer's initial in the brand's gold accent color.
    - A thin gold top-border that slides in on hover using a CSS `scaleX` transform for a premium reveal effect.
    - A unique professional SVG developer logo above the name:
      - **Abdullah**: Backend developer icon with code symbols (code-focused role)
      - **Hammad**: Database infrastructure icon with data grid pattern
      - **Majid**: Design/creative developer icon with design elements
    - **GitHub** and **LinkedIn** social links rendered as icon buttons using inline SVG (no external icon library dependency), with full hover inversion effect matching the project's button design language.
  - Card styling optimized with reduced padding (`p-3 p-lg-4`) and compact layout, focusing on a clean, minimal profile presentation with no role labels or descriptions (just initials, professional logo, name, and social links).
  - The card hover state (`translateY(-10px)` lift + border-color transition to `var(--primary)`) is consistent with the existing `.product-card:hover` rules.

- **Footer Quick Links (`index.html`)**:
  - Updated the "Shop All" link from `#` to `#products-container` (smooth in-page scroll to the products grid).
  - Updated the "About Us" link from a dead `#` placeholder to the live route `/views/about.html`.

## Phase 13: Contact Us Page & Backend Integration

- **Database Schema (`schema.sql`)**:
  - Added `contact_messages` table to store user inquiries with fields: `id` (auto-increment primary key), `email` (required, VARCHAR(100)), `phone` (optional, VARCHAR(20)), `message` (required, TEXT), and `submitted_at` (TIMESTAMP with default CURRENT_TIMESTAMP).

- **Backend API (`controllers/contactController.js`, `routes/contactRoutes.js`)**:
  - **`contactController.js`**: Implemented `submitContactMessage` with server-side validation for required fields (email, message) and email format using regex. Inserts data into `contact_messages` table. Added admin-only endpoints for viewing (`getAllContactMessages`) and deleting (`deleteContactMessage`) contact messages.
  - **`routes/contactRoutes.js`**: Created routes with public POST `/api/contact` for submissions and admin-protected GET/DELETE routes using JWT middleware.
  - **`app.js`**: Registered the contact routes at `/api/contact`.

- **Frontend Contact Page (`public/views/contact.html`)**:
  - Built a responsive contact form with email (required), phone (optional), and message (required, larger textarea) fields, matching the AHM design system with CSS variables for light/dark mode compatibility.
  - Integrated JavaScript for form submission via `fetch()` to `/api/contact`, displaying success/error alerts with auto-dismissal. Includes contact information sidebar and footer with updated "Contact Us" link.
  - Maintains consistent UI with hero section, premium card styling, and theme toggle functionality.

- **Footer Update (`index.html`)**:
  - Changed "Contact" link to "Contact Us" pointing to `/views/contact.html`.
