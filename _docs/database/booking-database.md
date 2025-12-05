---
title: "Booking Service Database"
permalink: /docs/database/booking-database/
excerpt: "Database schema for bookings and seat locking (MySQL)."
last_modified_at: 2025-12-05
toc: true
---

# Booking Service Database (MySQL)

Database Name: **booking_db**  
Tables: **bookings**, **seat_locks**

---

# 📌 Table: `bookings`

| Field        | Type                          | Null | Description |
|--------------|-------------------------------|------|-------------|
| id           | bigint                        | NO   | Booking ID (PK) |
| amount       | double                        | YES  | Total ticket price |
| booking_time | datetime(6)                   | YES  | When the booking was created |
| movie_id     | varchar(255)                  | YES  | Movie ID (MongoDB string) |
| seats        | varchar(255)                  | YES  | Comma-separated seat numbers |
| show_id      | bigint                        | YES  | Show ID |
| status       | enum('CANCELLED','CONFIRMED') | YES  | Final booking status |
| theatre_id   | bigint                        | YES  | Theatre ID |
| user_id      | bigint                        | YES  | User ID |

---

# 📌 Table: `seat_locks`

This table prevents double-booking by temporarily locking seats.

| Field       | Type         | Null | Description |
|-------------|--------------|------|-------------|
| id          | bigint       | NO   | Lock ID (PK) |
| created_at  | datetime(6)  | YES  | Timestamp lock created |
| expires_at  | datetime(6)  | YES  | Lock expiration time |
| seat_number | varchar(255) | YES  | Seat locked |
| show_id     | bigint       | YES  | Show ID |
| user_id     | bigint       | YES  | User who initiated booking |

---

## 🔐 Seat Locking Workflow
1. User selects seats  
2. System inserts rows into `seat_locks`  
3. User confirms → move seats to `bookings` table  
4. If user abandons, `expires_at` releases lock  

---

# ✔ End of Booking DB Documentation
