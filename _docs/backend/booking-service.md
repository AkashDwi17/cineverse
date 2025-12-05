---
title: "Booking Service"
permalink: /docs/backend/booking-service/
excerpt: "Manages booking lifecycle: seat lock, confirm, cancel, and retrieval."
last_modified_at: 2025-12-05
toc: true
---

### 5 `booking-service.md`

# Booking Service

**Port (example):** `8085`

## Responsibilities
- Lock seats for a pending booking (short TTL)
- Confirm bookings (payment simulated/actual)
- Cancel bookings and release seats
- Provide booking history/details

## Data model
- `bookingId` (Long)  
- `showId` (Long)  
- `userId` (Long)  
- `selectedSeats` (List<String>)  
- `status` (PENDING | CONFIRMED | CANCELLED)

## Dependencies
- Show Service (to validate show & available seats)
- Auth Service (user identity)
- Notification Service (send ticket)

## APIs

### POST `/api/bookings`
Request:
```json
{
 "showId": 5,
 "userId": 20,
 "seats": ["A1","A2"]
}
```