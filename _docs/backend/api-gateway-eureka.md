
---

### 7) `api-gateway-eureka.md`
```md
---
title: "API Gateway & Eureka Server"
permalink: /docs/backend/api-gateway-eureka/
excerpt: "Routing (API Gateway) and service discovery (Eureka) for BookMyShow microservices."
last_modified_at: 2025-12-05
toc: true
---

# API Gateway & Eureka

This document covers the API Gateway (router) and the Eureka service registry.

## 1) API Gateway

**Gateway Port:** `9191` (frontend should use this port)

### Routes (example)
- `/api/auth/**` → auth-service
- `/api/theatres/**` → theatre-service
- `/api/movies/**` → movie-service
- `/api/shows/**` → show-service
- `/api/bookings/**` → booking-service
- `/api/notify/**` → notification-service

### Example
