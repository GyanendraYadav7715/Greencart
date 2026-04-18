# 🛒 GreenCart — Full-Stack Grocery Shopping App

> A modern, full-stack online grocery store built with the **MERN stack**, featuring a seamless shopping experience, seller dashboard, and secure payment integration.

![GreenCart Banner](https://img.shields.io/badge/Stack-MERN-green?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Screenshots](#screenshots)
- [API Overview](#api-overview)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## 📖 About the Project

**GreenCart** is a full-stack e-commerce grocery platform where customers can browse fresh produce and daily essentials, manage their cart, save delivery addresses, and checkout using **Cash on Delivery** or **Stripe** online payment.

Sellers/Admins get a dedicated dashboard to manage product listings and track all orders in real time.

---

## ✨ Features

### 👤 Customer Side
- 🔐 User Authentication (Register / Login with JWT)
- 🛍️ Browse & Search Products by category
- 🛒 Add to Cart, update quantity, and remove items
- 📦 Place Orders via **Cash on Delivery** or **Stripe** (online payment)
- 📍 Save and manage multiple delivery addresses
- 📜 Order history and tracking

### 🧑‍💼 Seller / Admin Side
- 📊 Admin Dashboard with order overview
- ➕ Add, edit, and delete product listings
- 📦 View and manage all customer orders
- 🖼️ Image upload via **Cloudinary**

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js, Tailwind CSS, Axios |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose |
| **Authentication** | JWT (JSON Web Token) |
| **Payments** | Stripe API |
| **Image Storage** | Cloudinary |
| **State Management** | React Context API |

---

## 📁 Project Structure

```
GreenCart/
│
├── backend/
│   ├── configs/         # DB, Cloudinary, Stripe config
│   ├── controllers/     # Route handler logic
│   ├── middlewares/     # Auth, error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express route definitions
│   └── server.js        # Entry point
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/      # Images and static files
│       ├── components/  # Reusable UI components
│       ├── context/     # Global state (React Context)
│       ├── pages/       # Route-level page components
│       └── App.jsx      # Root component & routing
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `>= 18.x`
- [MongoDB](https://www.mongodb.com/) (local or [Atlas](https://www.mongodb.com/atlas))
- A [Stripe](https://stripe.com/) account (for payment integration)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

---

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/GyanendraYadav7715/Greencart.git
cd Greencart
```

2. **Install backend dependencies**

```bash
cd backend
npm install
```

3. **Install frontend dependencies**

```bash
cd ../frontend
npm install
```

---

### Environment Variables

#### Backend — create a `.env` file inside `/backend`

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

NODE_ENV=development
```

#### Frontend — create a `.env` file inside `/frontend`

```env
VITE_BACKEND_URL=http://localhost:4000
```

> 💡 **Stripe Note:** Use Stripe test card `4242 4242 4242 4242` with any future expiry and any CVC for testing payments.

---

### Running the App

**Start the Backend:**

```bash
cd backend
npm run dev
```

**Start the Frontend:**

```bash
cd frontend
npm run dev
```

Frontend runs at: `http://localhost:5173`  
Backend runs at: `http://localhost:4000`

---

## 📸 Screenshots

> *(Add screenshots of your app here — Home page, Product listing, Cart, Checkout, Admin Dashboard)*

---

## 🔌 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user/register` | Register a new user |
| `POST` | `/api/user/login` | Login user |
| `GET` | `/api/product/list` | Get all products |
| `POST` | `/api/product/add` | Add a new product (Admin) |
| `POST` | `/api/cart/update` | Update cart |
| `GET` | `/api/order/user` | Get user orders |
| `POST` | `/api/order/stripe` | Place order via Stripe |
| `POST` | `/api/order/cod` | Place order via COD |

> Full API documentation coming soon.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

Please open an issue first to discuss major changes.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 👨‍💻 Author

**Gyanendra Yadav**  
🔗 [GitHub](https://github.com/GyanendraYadav7715) • 💼 Java Backend Developer | MERN Enthusiast

---

> ⭐ If you found this project helpful, please consider giving it a star!
