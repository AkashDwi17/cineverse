---
title: "API Reference"
permalink: /docs/backend/api-reference/
excerpt: "Complete API reference for all Cineverse microservices"
last_modified_at: 2026-01-18
toc: true
---

# Complete API Reference

This document provides a comprehensive reference for all REST APIs across the Cineverse microservices platform.

## Base URLs

| Service | Port | Base URL |
|---------|------|----------|
| **API Gateway** | 9191 | `http://localhost:9191` |
| **Auth Service** | 8082 | `http://localhost:8082` |
| **Theatre Service** | 8083 | `http://localhost:8083` |
| **Movie Service** | 8084 | `http://localhost:8084` |
| **Show Service** | 8085 | `http://localhost:8085` |
| **Booking Service** | 8086 | `http://localhost:8086` |

> **Note**: All requests should go through the API Gateway at port 9191 in production.

---

## Authentication Service

### POST `/api/auth/signup`

Register a new user account.

**Authentication**: None required

**Request Body**:
```json
{
  "username": "john.doe@example.com",
  "password": "SecurePass123",
  "phone": "+919876543210",
  "city": "Bangalore",
  "state": "Karnataka",
  "role": "USER"
}
```

**Response** (200 OK):
```json
{
  "message": "User registered successfully"
}
```

**Error Responses**:
- `400 Bad Request` - Username already exists
- `400 Bad Request` - Phone already used

---

### POST `/api/auth/login`

Authenticate user and receive JWT token.

**Authentication**: None required

**Request Body**:
```json
{
  "username": "john.doe@example.com",
  "password": "SecurePass123"
}
```

**Response** (200 OK):
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "john.doe@example.com",
  "role": "USER"
}
```

**Error Responses**:
- `401 Unauthorized` - Invalid credentials
- `404 Not Found` - User not found

---

### GET `/api/auth/user/{username}`

Get user details by username.

**Authentication**: Required (Bearer token)

**Path Parameters**:
- `username` (string) - User's username/email

**Response** (200 OK):
```json
{
  "id": 1,
  "username": "john.doe@example.com",
  "role": "USER"
}
```

**Error Responses**:
- `404 Not Found` - User not found

---

## Movie Service

### POST `/api/movies`

Create a new movie (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Content-Type**: `multipart/form-data`

**Request Parts**:
- `movie` (JSON string):
```json
{
  "title": "Avengers: Endgame",
  "genre": "Action",
  "language": "English",
  "durationMinutes": 181,
  "rating": 8.4,
  "releaseDate": "2019-04-26",
  "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
  "description": "After the devastating events of Avengers: Infinity War..."
}
```
- `poster` (file, optional) - Movie poster image

**Response** (200 OK):
```json
{
  "id": "69246514c412948190c5fb80",
  "title": "Avengers: Endgame",
  "genre": "Action",
  "language": "English",
  "durationMinutes": 181,
  "rating": 8.4,
  "releaseDate": "2019-04-26",
  "posterUrl": "https://res.cloudinary.com/...",
  "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
  "description": "After the devastating events of Avengers: Infinity War..."
}
```

---

### GET `/api/movies`

Get all movies.

**Authentication**: None required

**Response** (200 OK):
```json
[
  {
    "id": "69246514c412948190c5fb80",
    "title": "Avengers: Endgame",
    "genre": "Action",
    "language": "English",
    "durationMinutes": 181,
    "rating": 8.4,
    "releaseDate": "2019-04-26",
    "posterUrl": "https://res.cloudinary.com/...",
    "cast": ["Robert Downey Jr.", "Chris Evans"],
    "description": "..."
  }
]
```

---

### GET `/api/movies/{id}`

Get movie by ID.

**Authentication**: None required

**Path Parameters**:
- `id` (string) - MongoDB ObjectId

**Response** (200 OK):
```json
{
  "id": "69246514c412948190c5fb80",
  "title": "Avengers: Endgame",
  "genre": "Action",
  "language": "English",
  "durationMinutes": 181,
  "rating": 8.4,
  "releaseDate": "2019-04-26",
  "posterUrl": "https://res.cloudinary.com/...",
  "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
  "description": "After the devastating events..."
}
```

**Error Responses**:
- `404 Not Found` - Movie not found

---

### GET `/api/movies/search`

Search movies by title.

**Authentication**: None required

**Query Parameters**:
- `query` (string) - Search query

**Example**: `/api/movies/search?query=avengers`

**Response** (200 OK):
```json
[
  {
    "id": "69246514c412948190c5fb80",
    "title": "Avengers: Endgame",
    "genre": "Action",
    "language": "English",
    "durationMinutes": 181,
    "rating": 8.4,
    "releaseDate": "2019-04-26",
    "posterUrl": "https://res.cloudinary.com/...",
    "cast": ["Robert Downey Jr.", "Chris Evans"],
    "description": "..."
  }
]
```

---

### PUT `/api/movies/{id}`

Update movie details (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Content-Type**: `multipart/form-data`

**Path Parameters**:
- `id` (string) - MongoDB ObjectId

**Request Parts**:
- `movie` (JSON string) - Updated movie data
- `poster` (file, optional) - New poster image

**Response** (200 OK): Updated movie object

---

### DELETE `/api/movies/{id}`

Delete a movie (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Path Parameters**:
- `id` (string) - MongoDB ObjectId

**Response** (204 No Content)

---

## Theatre Service

### POST `/api/theatres`

Create a new theatre (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Request Body**:
```json
{
  "name": "PVR Cinemas Koramangala",
  "address": "Forum Mall, Koramangala",
  "city": "Bangalore",
  "screenType": "IMAX",
  "totalSeats": 250
}
```

**Screen Types**: `TWO_D`, `THREE_D`, `IMAX`

**Response** (201 Created):
```json
{
  "id": 1,
  "name": "PVR Cinemas Koramangala",
  "address": "Forum Mall, Koramangala",
  "city": "Bangalore",
  "screenType": "IMAX",
  "totalSeats": 250
}
```

---

### GET `/api/theatres/list`

Get all theatres, optionally filtered by city.

**Authentication**: None required

**Query Parameters**:
- `city` (string, optional) - Filter by city

**Example**: `/api/theatres/list?city=Bangalore`

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "name": "PVR Cinemas Koramangala",
    "address": "Forum Mall, Koramangala",
    "city": "Bangalore",
    "screenType": "IMAX",
    "totalSeats": 250
  }
]
```

---

### GET `/api/theatres/view/{id}`

Get theatre by ID.

**Authentication**: None required

**Path Parameters**:
- `id` (long) - Theatre ID

**Response** (200 OK):
```json
{
  "id": 1,
  "name": "PVR Cinemas Koramangala",
  "address": "Forum Mall, Koramangala",
  "city": "Bangalore",
  "screenType": "IMAX",
  "totalSeats": 250
}
```

**Error Responses**:
- `404 Not Found` - Theatre not found

---

### PUT `/api/theatres/{id}`

Update theatre details (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Path Parameters**:
- `id` (long) - Theatre ID

**Request Body**: Same as create

**Response** (200 OK): Updated theatre object

---

### DELETE `/api/theatres/{id}`

Delete a theatre (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Path Parameters**:
- `id` (long) - Theatre ID

**Response** (204 No Content)

---

### GET `/api/theatres/movie/{movieId}`

Get theatres showing a specific movie in a city.

**Authentication**: None required

**Path Parameters**:
- `movieId` (long) - Movie ID

**Query Parameters**:
- `city` (string, required) - City name

**Example**: `/api/theatres/movie/1?city=Bangalore`

**Response** (200 OK): List of theatres

---

## Show Service

### POST `/api/shows`

Create a new show (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Request Body**:
```json
{
  "movieId": "69246514c412948190c5fb80",
  "theatreId": 1,
  "showDate": "2026-01-25",
  "showTime": "18:30",
  "price": 250.0
}
```

**Response** (200 OK):
```json
{
  "id": 1,
  "movieId": "69246514c412948190c5fb80",
  "theatreId": 1,
  "showDate": "2026-01-25",
  "showTime": "18:30",
  "price": 250.0,
  "movieTitle": "Avengers: Endgame",
  "theatreName": "PVR Cinemas Koramangala",
  "theatreCity": "Bangalore"
}
```

---

### GET `/api/shows`

Get all shows (Admin).

**Authentication**: Required (Bearer token, ADMIN role)

**Response** (200 OK): List of all shows

---

### GET `/api/shows/{id}`

Get show by ID.

**Authentication**: None required

**Path Parameters**:
- `id` (long) - Show ID

**Response** (200 OK):
```json
{
  "id": 1,
  "movieId": "69246514c412948190c5fb80",
  "theatreId": 1,
  "showDate": "2026-01-25",
  "showTime": "18:30",
  "price": 250.0,
  "movieTitle": "Avengers: Endgame",
  "theatreName": "PVR Cinemas Koramangala",
  "theatreCity": "Bangalore"
}
```

---

### GET `/api/shows/by-movie/{movieId}`

Get shows for a specific movie, optionally filtered by city.

**Authentication**: None required

**Path Parameters**:
- `movieId` (string) - MongoDB ObjectId

**Query Parameters**:
- `city` (string, optional) - Filter by city

**Example**: `/api/shows/by-movie/69246514c412948190c5fb80?city=Bangalore`

**Response** (200 OK): List of shows

---

### GET `/api/shows/by-theatre/{theatreId}`

Get shows for a specific theatre.

**Authentication**: None required

**Path Parameters**:
- `theatreId` (long) - Theatre ID

**Response** (200 OK): List of shows

---

### PUT `/api/shows/{id}`

Update show details (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Path Parameters**:
- `id` (long) - Show ID

**Request Body**: Same as create

**Response** (200 OK): Updated show object

---

### DELETE `/api/shows/{id}`

Delete a show (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Path Parameters**:
- `id` (long) - Show ID

**Response** (200 OK):
```json
{
  "message": "Show deleted successfully"
}
```

---

## Booking Service

### POST `/api/bookings/lock`

Lock seats temporarily for booking.

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "showId": 1,
  "userId": 5,
  "seats": ["A1", "A2", "A3"]
}
```

**Response** (200 OK):
```json
[
  {
    "id": 1,
    "showId": 1,
    "userId": 5,
    "seatNumber": "A1",
    "createdAt": "2026-01-18T00:30:00",
    "expiresAt": "2026-01-18T00:40:00"
  },
  {
    "id": 2,
    "showId": 1,
    "userId": 5,
    "seatNumber": "A2",
    "createdAt": "2026-01-18T00:30:00",
    "expiresAt": "2026-01-18T00:40:00"
  }
]
```

**Error Responses**:
- `400 Bad Request` - Seat already locked or booked

---

### POST `/api/bookings/confirm`

Confirm booking after payment.

**Authentication**: Required (Bearer token)

**Request Body**:
```json
{
  "showId": 1,
  "userId": 5,
  "theatreId": 1,
  "movieId": "69246514c412948190c5fb80",
  "seats": ["A1", "A2"],
  "amount": 500.0
}
```

**Response** (200 OK):
```json
{
  "id": 10,
  "showId": 1,
  "userId": 5,
  "theatreId": 1,
  "movieId": "69246514c412948190c5fb80",
  "seats": "A1,A2",
  "amount": 500.0,
  "bookingTime": "2026-01-18T00:35:00",
  "status": "CONFIRMED",
  "movieTitle": "Avengers: Endgame",
  "theatreName": "PVR Cinemas Koramangala",
  "showDate": "2026-01-25",
  "showTime": "18:30"
}
```

---

### GET `/api/bookings/{id}`

Get booking by ID.

**Authentication**: Required (Bearer token)

**Path Parameters**:
- `id` (long) - Booking ID

**Response** (200 OK): Booking object

---

### GET `/api/bookings/user/{userId}`

Get all bookings for a user.

**Authentication**: Required (Bearer token)

**Path Parameters**:
- `userId` (long) - User ID

**Response** (200 OK): List of bookings

---

### GET `/api/bookings/all`

Get all bookings (Admin only).

**Authentication**: Required (Bearer token, ADMIN role)

**Response** (200 OK): List of all bookings

---

### GET `/api/bookings/sold-seats/{showId}`

Get sold (confirmed) seats for a show.

**Authentication**: None required

**Path Parameters**:
- `showId` (long) - Show ID

**Response** (200 OK):
```json
["A1", "A2", "B5", "C3"]
```

---

### GET `/api/bookings/locked-seats/{showId}`

Get currently locked seats for a show.

**Authentication**: None required

**Path Parameters**:
- `showId` (long) - Show ID

**Response** (200 OK):
```json
["D1", "D2"]
```

---

### GET `/api/bookings/seat-status/{showId}`

Get unified seat status (sold + locked) for a show.

**Authentication**: None required

**Path Parameters**:
- `showId` (long) - Show ID

**Response** (200 OK):
```json
[
  {
    "seat": "A1",
    "status": "sold"
  },
  {
    "seat": "D1",
    "status": "locked"
  }
]
```

---

## Common Response Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 201 | Created | Resource created successfully |
| 204 | No Content | Request successful, no content to return |
| 400 | Bad Request | Invalid request data |
| 401 | Unauthorized | Authentication required or failed |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 500 | Internal Server Error | Server error |

---

## Authentication

Most endpoints require JWT authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Role-Based Access

- **USER**: Can view movies, theatres, shows, and make bookings
- **ADMIN**: Can manage movies, theatres, shows, and view all bookings
- **SUPER_ADMIN**: Full access including user management

---

## Rate Limiting

Currently no rate limiting is implemented. Consider implementing rate limiting in production.

---

## CORS Configuration

CORS is configured to allow requests from the frontend application. Update CORS settings in the API Gateway for production deployment.
