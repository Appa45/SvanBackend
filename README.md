# Swan Organics Backend

Node.js and Express API skeleton with MongoDB-backed authentication.

## Setup

```bash
npm install
copy .env.example .env
npm run dev
```

Update `.env` with your MongoDB connection string and JWT secret.

## Auth APIs

Base URL: `http://localhost:5000/api`

### Health

`GET /health`

### Register

`POST /auth/register`

```json
{
  "name": "Swan Admin",
  "email": "admin@swanorganics.com",
  "password": "Password123"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "admin@swanorganics.com",
  "password": "Password123"
}
```

### Current User

`GET /auth/me`

Header:

```text
Authorization: Bearer <token>
```
