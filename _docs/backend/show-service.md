
---

### 4) `show-service.md`
```md
---
title: "Show Service"
permalink: /docs/backend/show-service/
excerpt: "Maps movies to theatres with date/time and pricing (shows)."
last_modified_at: 2025-12-05
toc: true
---

# Show Service

**Port (example):** `8084`

## Responsibilities
- Create/update/delete show records
- Provide show listings by movie or theatre

## Data model
- `id` (Long)  
- `movieId` (Long)  
- `theatreId` (Long)  
- `showDate` (YYYY-MM-DD)  
- `showTime` (HH:mm)  
- `price` (Integer)

## Dependencies
- Movie Service (validate `movieId`)
- Theatre Service (validate `theatreId`)
- Auth Service (role checks)

## APIs

### GET `/api/shows/by-movie/{movieId}`
List shows for a movie.

### GET `/api/shows/by-theatre/{theatreId}`
List shows for a theatre.

### POST `/api/shows` (ADMIN)
```json
{
 "movieId":101,
 "theatreId":5,
 "showDate":"2025-11-25",
 "showTime":"18:30",
 "price":200
}
