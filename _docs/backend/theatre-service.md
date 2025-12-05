
---

### 2) `theatre-service.md`
```md
---
title: "Theatre Service"
permalink: /docs/backend/theatre-service/
excerpt: "Manages theatres, screens, and seat capacities."
last_modified_at: 2025-12-05
toc: true
---

# Theatre Service

**Port (example):** `8082`

## Responsibilities
- Store theatre records (name, address, city, screen type, seat counts)
- Allow listing and retrieval of theatre details
- Admin operations: create, update, delete theatres

## Data fields
- `id` (Long)  
- `name` (String)  
- `address` (String)  
- `city` (String)  
- `screenType` (TWO_D | THREE_D | IMAX)  
- `totalSeats` (int)

## APIs

### GET `/api/theatres/list`
List all theatres.

### GET `/api/theatres/view/{id}`
Get theatre details.

### POST `/api/theatres` (ADMIN)
Create theatre.
```json
{
 "name":"PVR",
 "address":"Bellandur",
 "city":"Bangalore",
 "screenType":"TWO_D",
 "totalSeats":250
}
