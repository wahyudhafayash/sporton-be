# Sporton Backend API

Sporton adalah backend API yang dibangun dengan **Express.js** dan **TypeScript** untuk mengelola sistem produk, kategori, bank, dan transaksi. API ini menyediakan fitur autentikasi, manajemen produk, dan pemrosesan transaksi dengan dukungan upload file.

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Teknologi yang Digunakan](#teknologi-yang-digunakan)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Struktur Proyek](#struktur-proyek)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Autentikasi](#autentikasi)
- [Middleware](#middleware)

## ✨ Fitur Utama

- **Autentikasi Pengguna**: Sign in dan inisialisasi admin user
- **Manajemen Kategori**: Create, Read, Update, Delete kategori produk
- **Manajemen Produk**: Create, Read, Update, Delete produk dengan upload gambar
- **Manajemen Bank**: Create, Read, Update, Delete data bank
- **Manajemen Transaksi**: Create, Read, Update transaksi dengan sistem checkout
- **JWT Authentication**: Keamanan API menggunakan JSON Web Token
- **Upload File**: Dukungan upload gambar untuk produk dan kategori
- **CORS Enabled**: Support untuk cross-origin requests

## 🛠️ Teknologi yang Digunakan

### Dependencies Utama

| Package        | Versi   | Deskripsi                                   |
| -------------- | ------- | ------------------------------------------- |
| `express`      | ^5.2.1  | Web framework untuk Node.js                 |
| `typescript`   | ^5.9.3  | Superset dari JavaScript dengan type safety |
| `mongoose`     | ^9.1.5  | MongoDB object modeling                     |
| `jsonwebtoken` | ^9.0.3  | JWT untuk autentikasi                       |
| `bcrypt`       | ^6.0.0  | Hashing password yang aman                  |
| `cors`         | ^2.8.6  | Cross-Origin Resource Sharing middleware    |
| `multer`       | ^2.0.2  | Middleware untuk upload file                |
| `dotenv`       | ^17.2.3 | Manajemen environment variables             |

### Development Dependencies

- `@types/node` - Type definitions untuk Node.js
- `@types/express` - Type definitions untuk Express
- `@types/bcrypt` - Type definitions untuk Bcrypt
- `@types/jsonwebtoken` - Type definitions untuk JWT
- `@types/cors` - Type definitions untuk CORS
- `@types/multer` - Type definitions untuk Multer
- `nodemon` - Auto-restart saat development
- `ts-node` - TypeScript executor

## 📦 Prasyarat

Sebelum memulai, pastikan sudah terinstall:

- **Node.js** (v18 atau lebih tinggi)
- **npm** atau **pnpm** (versi 10.28.1+)
- **MongoDB** (local atau cloud)

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd sporton-be
```

### 2. Install Dependencies

Menggunakan pnpm (direkomendasikan):

```bash
pnpm install
```

Atau menggunakan npm:

```bash
npm install
```

## 🔧 Konfigurasi Environment

Buat file `.env` di root directory dengan konfigurasi berikut:

```env
# Server Configuration
PORT=8000

# Database Configuration
MONGO_URI=mongodb://localhost:27017/sporton

# JWT Configuration
JWT_SECRET=SportonSecretKey123

# Upload Configuration
UPLOAD_DIR=./uploads
```

### Penjelasan Environment Variables

| Variable     | Deskripsi                             | Default             |
| ------------ | ------------------------------------- | ------------------- |
| `PORT`       | Port server berjalan                  | 8000                |
| `MONGO_URI`  | Connection string MongoDB             | -                   |
| `JWT_SECRET` | Secret key untuk JWT token            | SportonSecretKey123 |
| `UPLOAD_DIR` | Direktori untuk menyimpan upload file | ./uploads           |

## 🏃 Menjalankan Aplikasi

### Mode Development (dengan auto-reload)

```bash
pnpm dev
```

Server akan berjalan di `http://localhost:8000` dan otomatis restart saat ada perubahan file.

### Build untuk Production

```bash
pnpm build
```

Perintah ini akan mengcompile TypeScript ke JavaScript dalam folder `dist/`.

### Jalankan Build Production

```bash
pnpm start
```

## 📁 Struktur Proyek

```
sporton-be/
├── src/
│   ├── controllers/          # Business logic untuk setiap endpoint
│   │   ├── auth.controller.ts
│   │   ├── category.controller.ts
│   │   ├── product.controller.ts
│   │   ├── bank.controller.ts
│   │   └── transaction.controller.ts
│   ├── models/               # Database schema (Mongoose models)
│   │   ├── user.model.ts
│   │   ├── category.model.ts
│   │   ├── product.model.ts
│   │   ├── bank.model.ts
│   │   └── transaction.model.ts
│   ├── routes/               # API route definitions
│   │   ├── auth.route.ts
│   │   ├── category.route.ts
│   │   ├── product.route.ts
│   │   ├── bank.route.ts
│   │   └── transaction.route.ts
│   ├── middlewares/          # Custom middlewares
│   │   ├── auth.middleware.ts      # JWT authentication
│   │   └── upload.middleware.ts    # File upload handling
│   ├── app.ts                # Express app setup
│   └── server.ts             # Server entry point
├── uploads/                  # Directory untuk uploaded files
├── dist/                     # Compiled JavaScript (production)
├── package.json              # Project metadata & dependencies
├── tsconfig.json             # TypeScript configuration
├── pnpm-lock.yaml            # Lock file for pnpm
└── README.md                 # Documentation
```

## 🔌 API Endpoints

### Authentication (`/api/auth`)

#### Sign In

```http
POST /api/auth/signin
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_id",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

#### Initiate Admin User

```http
POST /api/auth/initiate-admin-user
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123",
  "name": "Admin User"
}
```

---

### Categories (`/api/categories`)

#### Get All Categories

```http
GET /api/categories
```

#### Get Category by ID

```http
GET /api/categories/:id
```

#### Create Category (Protected)

```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Electronics",
  "description": "Electronic products",
  "image": <file>
}
```

#### Update Category (Protected)

```http
PUT /api/categories/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Category (Protected)

```http
DELETE /api/categories/:id
Authorization: Bearer <token>
```

---

### Products (`/api/products`)

#### Get All Products

```http
GET /api/products
```

#### Get Product by ID

```http
GET /api/products/:id
```

#### Create Product (Protected)

```http
POST /api/products
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "categoryId": "category_id",
  "image": <file>
}
```

#### Update Product (Protected)

```http
PUT /api/products/:id
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

#### Delete Product (Protected)

```http
DELETE /api/products/:id
Authorization: Bearer <token>
```

---

### Banks (`/api/banks`)

#### Get All Banks

```http
GET /api/banks
```

#### Get Bank by ID

```http
GET /api/banks/:id
```

#### Create Bank (Protected)

```http
POST /api/banks
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Bank Name",
  "accountNumber": "1234567890",
  "accountHolder": "Account Holder Name"
}
```

#### Update Bank (Protected)

```http
PUT /api/banks/:id
Authorization: Bearer <token>
Content-Type: application/json
```

#### Delete Bank (Protected)

```http
DELETE /api/banks/:id
Authorization: Bearer <token>
```

---

### Transactions (`/api/transactions`)

#### Create Transaction (Checkout)

```http
POST /api/transactions/checkout
Content-Type: multipart/form-data

{
  "productId": "product_id",
  "quantity": 2,
  "totalPrice": 199.98,
  "buyerName": "Buyer Name",
  "buyerEmail": "buyer@example.com",
  "proofOfPayment": <file>
}
```

#### Get All Transactions (Protected)

```http
GET /api/transactions
Authorization: Bearer <token>
```

#### Get Transaction by ID

```http
GET /api/transactions/:id
```

#### Update Transaction (Protected)

```http
PUT /api/transactions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "completed"
}
```

---

## 💾 Database Models

### User Model

```typescript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Category Model

```typescript
{
  name: String (required),
  description: String,
  image: String (URL path),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Product Model

```typescript
{
  name: String (required),
  description: String,
  price: Number (required),
  categoryId: ObjectId (reference to Category),
  image: String (URL path),
  stock: Number (default: 0),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Bank Model

```typescript
{
  name: String (required),
  accountNumber: String (required),
  accountHolder: String (required),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Transaction Model

```typescript
{
  productId: ObjectId (reference to Product),
  quantity: Number (required),
  totalPrice: Number (required),
  buyerName: String (required),
  buyerEmail: String (required),
  proofOfPayment: String (file path),
  status: String (enum: pending, completed, cancelled),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

---

## 🔐 Autentikasi

Aplikasi menggunakan **JWT (JSON Web Token)** untuk autentikasi.

### Cara Menggunakan Token

1. **Login** menggunakan endpoint `/api/auth/signin`
2. **Dapatkan token** dari response
3. **Gunakan token** di header request untuk endpoint yang dilindungi:
   ```
   Authorization: Bearer <your-jwt-token>
   ```

### Token Expiration

- Token berlaku selama **1 hari (24 jam)**
- Setelah expiration, user perlu login ulang untuk mendapatkan token baru

---

## 🧩 Middleware

### Authentication Middleware

File: [src/middlewares/auth.middleware.ts](src/middlewares/auth.middleware.ts)

Melindungi endpoint yang memerlukan autentikasi. Memverifikasi JWT token di header `Authorization`.

```typescript
app.use(authenticate, ...)  // Lindungi route dengan auth
```

### Upload Middleware

File: [src/middlewares/upload.middleware.ts](src/middlewares/upload.middleware.ts)

Menangani upload file (gambar) ke folder `uploads/`. Menggunakan library `multer`.

```typescript
router.post("/", upload.single("image"), ...)  // Upload satu file
```

---

## 📝 Catatan Penting

- Pastikan folder `uploads/` sudah ada atau akan dibuat otomatis
- Database MongoDB harus berjalan sebelum server dimulai
- Gunakan environment variables untuk credentials sensitif
- Token JWT sebaiknya disimpan dengan aman di client (HttpOnly cookie recommended)
- Semua password di-hash menggunakan bcrypt sebelum disimpan

## 🤝 Kontribusi

Silakan buat pull request atau report issues jika ada bug atau saran improvement.



---

**Dibuat dengan ❤️ untuk Sporton Backend**
