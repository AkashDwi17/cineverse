---
title: "Show Service Database"
permalink: /docs/database/show-database/
excerpt: "Schema for movie show schedules stored by Show Service (MySQL)."
last_modified_at: 2025-12-05
toc: true
---

# Show Service Database (MySQL)

Database Name: **show_db**  
Table: **shows**

---

## 📌 Table: `shows`

| Field      | Type         | Null | Key | Description |
|------------|--------------|------|-----|-------------|
| id         | bigint       | NO   | PRI | Auto-increment primary key |
| movie_id   | varchar(255) | YES  |     | ID of movie (stored in MongoDB as string) |
| price      | double       | YES  |     | Ticket price |
| show_date  | varchar(255) | YES  |     | Date of show (e.g., "2025-11-25") |
| show_time  | varchar(255) | YES  |     | Time of show (e.g., "18:30") |
| theatre_id | bigint       | YES  |     | Reference to theatre ID |

---

## 🔗 Relationships
- `movie_id` → MongoDB movies collection (`_id`)
- `theatre_id` → MySQL (`bookmyshow_theatre.theatres.id`)

---

# ✔ End of Show DB Documentation
