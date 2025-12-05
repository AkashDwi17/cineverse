---
title: "Theatre Service Database"
permalink: /docs/database/theatre-database/
excerpt: "Database schema for BookMyShow Theatre Service (MySQL)."
last_modified_at: 2025-12-05
toc: true
---

# Theatre Service Database (MySQL)

Database Name: **bookmyshow_theatre**  
Table: **theatres**

---

## 📌 Table: `theatres`

| Field       | Type                           | Null | Key | Description |
|-------------|--------------------------------|------|-----|-------------|
| id          | bigint                         | NO   | PRI | Auto-increment primary key |
| address     | varchar(255)                   | YES  |     | Theatre address |
| city        | varchar(255)                   | YES  |     | City location |
| name        | varchar(255)                   | YES  |     | Theatre name |
| screen_type | enum('IMAX','THREE_D','TWO_D') | YES  |     | Screen format |
| total_seats | int                            | YES  |     | Total seating capacity |

---

## 🎬 Notes
- Screen type affects pricing and compatibility with certain movies.
- `total_seats` is used by the Show & Booking service during seat allocation.

---

# ✔ End of Theatre DB Documentation
