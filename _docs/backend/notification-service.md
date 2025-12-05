
---

### 6) `notification-service.md`
```md
---
title: "Notification Service"
permalink: /docs/backend/notification-service/
excerpt: "Sends booking tickets to user via WhatsApp (simulated)."
last_modified_at: 2025-12-05
toc: true
---

# Notification Service (WhatsApp Ticket)

**Port (example):** `8086`

## Responsibilities
- Accept a ticket payload and send a WhatsApp message (via Meta/WhatsApp API or simulated)
- Provide a send-ticket endpoint used by Booking Service

## Data model (for message)
- `phone` (String)  
- `bookingId` (Long)  
- `movie` (String)  
- `theatre` (String)  
- `showTime` (String)  
- `seats` (List<String>)

## API

### POST `/api/notify/send-ticket`
```json
{
  "phone": "+91XXXXXXXX",
  "bookingId": 55,
  "movie": "Avengers",
  "theatre": "PVR Bellandur",
  "showTime": "6:30 PM",
  "seats": ["A1","A2"]
}
