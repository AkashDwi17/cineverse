---
title: "Auth Service"
permalink: /docs/backend/auth-service/
excerpt: "Handles user signup, login and JWT-based authentication."
last_modified_at: 2025-12-05
toc: true
---

# Auth Service

**Purpose:** Manage user registration, login and JWT issuance used across other microservices.

**Typical Port:** `8081` (example — change to whatever your app uses)

## Responsibilities
- Register new users (signup)
- Authenticate users (login)
- Generate JWT tokens with role claims (USER / ADMIN)
- Password hashing and basic validation

## Data model
- `id`: Long  
- `name`: String  
- `email`: String  
- `password`: String (hashed)  
- `role`: String (USER / ADMIN)

## APIs

### `POST /api/auth/signup`
Register a new user.

**Request**
```json
{
  "name": "Rajesh",
  "email": "rajesh@gmail.com",
  "password": "123456",
  "role": "ADMIN"
}
