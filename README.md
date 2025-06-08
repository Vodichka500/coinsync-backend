# 🧠 CoinSync API Documentation

**Backend:** NestJS + Prisma + PostgreSQL
**Base URL:** `http://localhost:4012/api`
---
Coinsync is a backend service for managing cryptocurrency and fiat currency comparisons. It supports user authentication and authorization, fetches data from external APIs, and stores comparison results in a PostgreSQL database. The backend is built with modern technologies to ensure security, scalability, and maintainability.

## 🚀 Technologies Used

- **NestJS** — Framework for building efficient, scalable Node.js server-side applications
- **PrismaORM** — ORM for database modeling and querying PostgreSQL
- **PostgreSQL** — Relational database system for storing user and comparison data
- **Passport.js** — Authentication middleware
- **JWT (JSON Web Tokens)** — Token-based authentication
- **Docker & Docker Compose** — Containerization and orchestration for easy deployment


---
## 🛠️ Installation and Setup
1. Create a `.env` file in the root directory of the backend with the following content:

```
DATABASE_URL=postgresql://admin:admin@database:5432/coinsync
JWT_SECRET="bambaleyla"
PORT=4012
```

2. Ensure you have Docker installed and running.
3. Run the following command to start the backend and database:

```bash
cd path/to/project/backend
docker-compose up --build
```

After the containers are up, the API will be available at `http://localhost:4012/api`.

---

## 🔐 Auth Endpoints

### 🔸 Register

* **POST** `/auth/register`
* **Auth:** ❌

**Request Body:**

```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

---

### 🔸 Login

* **POST** `/auth/login`
* **Auth:** ❌

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### 🔸 Get User Profile

* **GET** `/users/profile`
* **Auth:** ✅ (Bearer token)

**Headers:**

```
Authorization: Bearer <accessToken>
```

**Response:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "USER"
}
```

---

## 👤 User Management (Admin only)

### 🔸 Delete User by ID

* **DELETE** `/users/:id`
* **Auth:** ✅ (Admin only)

**Response:**

```json
{
  "message": "User deleted successfully"
}
```

---

## 💱 Currency Endpoints

### 🔸 Get Fiat Currencies

* **GET** `/currency/fiat`
* **Auth:** ❌

**Response:**

```json
[
  { "symbol": "USD", "name": "US Dollar" },
  { "symbol": "EUR", "name": "Euro" },
  { "symbol": "PLN", "name": "Polish Zloty" }
]
```

---

### 🔸 Get Crypto Currencies

* **GET** `/currency/crypto`
* **Auth:** ❌

**Response:**

```json
[
  { "id": "bitcoin", "symbol": "BTC", "name": "Bitcoin" },
  { "id": "ethereum", "symbol": "ETH", "name": "Ethereum" }
]
```

---

## 📊 Currency Comparison

### 🔸 Create a Comparison

* **POST** `/comparison/compare`
* **Auth:** ✅ (USER or ADMIN)

**Request Body:**

```json
{
  "cryptoId": "bitcoin",
  "fiatSymbol": "EUR",
  "startDate": "2025-01-01T00:00:00Z",
  "endDate": "2025-01-05T00:00:00Z"
}
```

**Response:**

```json
{
  "id": 7,
  "userId": 1,
  "cryptoId": "bitcoin",
  "fiatSymbol": "EUR",
  "startDate": "2025-01-01T00:00:00.000Z",
  "endDate": "2025-01-05T00:00:00.000Z",
  "data": [
    { "date": "2025-01-01", "crypto": 42800.0, "fiat": 0.85 },
    { "date": "2025-01-02", "crypto": 43200.0, "fiat": 0.86 }
  ]
}
```

---

### 🔸 Get All Comparisons for Logged-in User

* **GET** `/comparison/user`
* **Auth:** ✅

**Response:**

```json
[
  {
    "id": 7,
    "cryptoId": "bitcoin",
    "fiatSymbol": "EUR",
    "startDate": "2025-01-01T00:00:00.000Z",
    "endDate": "2025-01-05T00:00:00.000Z",
    "createdAt": "2025-06-08T10:00:00.000Z"
  }
]
```

---

### 🔸 Get Comparison by ID

* **GET** `/comparison/:id`
* **Auth:** ✅

**Response:**

```json
{
  "id": 7,
  "cryptoId": "bitcoin",
  "fiatSymbol": "EUR",
  "startDate": "2025-01-01T00:00:00.000Z",
  "endDate": "2025-01-05T00:00:00.000Z",
  "data": [
    { "date": "2025-01-01", "crypto": 42800.0, "fiat": 0.85 },
    { "date": "2025-01-02", "crypto": 43200.0, "fiat": 0.86 }
  ]
}
```

---

### 🔸 Delete All Comparisons (Admin only)

* **POST** `/comparison/1`
* **Auth:** ✅ (Admin only)

**Response:**

```json
{
  "status": "success",
  "message": "All comparisons deleted successfully"
}
```

---

## 🗂 Example Auth Header

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR...
```

---

