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
    "id": 2,
    "currencyAId": 37,
    "currencyBId": 38,
    "periodStart": "2025-01-06T12:00:00.000Z",
    "periodEnd": "2025-01-12T12:00:00.000Z",
    "averageRatio": 93348.81076891569,
    "maxRatio": 98422.36282579506,
    "minRatio": 89650.88876500486,
    "volatility": 2652.874077907001,
    "priceChangeA": -0.04687642749475013,
    "priceChangeB": -0.01170151544216381,
    "recommendation": "Neutral",
    "createdAt": "2025-06-08T17:29:25.205Z",
    "userId": 6,
    "currencyA": {
        "id": 37,
        "name": "Bitcoin",
        "symbol": "btc",
        "type": "CRYPTO",
        "createdAt": "2025-06-08T17:29:25.097Z",
        "periodStart": "2025-01-06T12:00:00.000Z",
        "periodEnd": "2025-01-12T12:00:00.000Z",
        "days": [
            {
                "id": 3130,
                "currencyId": 37,
                "date": "2025-01-06T12:04:03.575Z",
                "value": 99223.43302212954
            },
           ...
        ]
    },
    "currencyB": {
        "id": 38,
        "name": "EUR",
        "symbol": "EUR",
        "type": "FIAT",
        "createdAt": "2025-06-08T17:29:25.137Z",
        "periodStart": "2025-01-06T12:00:00.000Z",
        "periodEnd": "2025-01-12T12:00:00.000Z",
        "days": [
            {
                "id": 3274,
                "currencyId": 38,
                "date": "2025-01-06T00:00:00.000Z",
                "value": 1.0426
            },
            ...
        ]
    },
    "user": {
        "id": 6,
        "email": "user-email@emial.com",
        "name": null,
        "password": "$2b$10$RFU7CucfTD3ZC4jP/QgjDu7qztINcS0ppxos.yAoDmZlU0KEgBHee",
        "role": "USER",
        "createdAt": "2025-06-08T09:44:45.839Z",
        "updatedAt": "2025-06-08T09:44:45.839Z"
    }
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

