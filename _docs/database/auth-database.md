---
title: "Auth Service Database"
permalink: /docs/database/auth-database/
excerpt: "Database schema for BookMyShow Auth Service (MySQL)."
last_modified_at: 2025-12-05
toc: true
---

# Auth Service Database (MySQL)

Database Name: **bookmyshow_auth**  
Table: **users**

This table stores all registered users for the BookMyShow system.

---

## 📌 Table: `users`

| Field    | Type                               | Null | Key | Description |
|----------|------------------------------------|------|-----|-------------|
| id       | bigint                             | NO   | PRI | Auto-increment primary key |
| city     | varchar(255)                       | YES  |     | User’s city |
| password | varchar(255)                       | NO   |     | Encrypted password |
| phone    | varchar(255)                       | YES  |     | User contact number |
| role     | enum('ADMIN','SUPER_ADMIN','USER') | YES  |     | Authorization role |
| state    | varchar(255)                       | YES  |     | User state |
| username | varchar(255)                       | NO   | UNI | Unique login username |

---

## 📘 Notes
- `username` is used for login (not email).
- Roles are stored directly in DB but validated via JWT.
- Passwords must be hashed (BCrypt recommended).

---

# ✔ End of Auth DB Documentation
