---
title: "Diagrams"
permalink: /docs/diagrams/
excerpt: "System Architecture Diagrams for Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# System Architecture Diagrams

## Microservices Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CINEVERSE PLATFORM                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER (React.js)                   │
│  User Interface | Show Listings | Seat Selection | Bookings      │
│                         Port: 5173                                │
└──────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌──────────────────────────────────────────────────────────────────┐
│              API GATEWAY (Spring Cloud Gateway)                  │
│                     Port: 9191                                   │
│  Route Management | Load Balancing | Request Filtering          │
└──────────────────────────────────────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
        ▼                      ▼                      ▼
   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
   │  AUTH SERVICE   │  │ THEATRE SERVICE │  │  MOVIE SERVICE  │
   │   (Port 8081)   │  │   (Port 8082)   │  │   (Port 8083)   │
   └─────────────────┘  └─────────────────┘  └─────────────────┘
        │ (MySQL)           │ (MySQL)           │ (MongoDB)
        
        ▼                      ▼                      ▼
   ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
   │  SHOW SERVICE   │  │ BOOKING SERVICE │  │ NOTIFICATION    │
   │   (Port 8084)   │  │   (Port 8085)   │  │ SERVICE         │
   └─────────────────┘  └─────────────────┘  │ (Port 8086)     │
        │ (MySQL)           │ (MySQL)           └─────────────────┘
        │                   │                        │
        └───────────────────┴────────────────────────┘
                      │
                      ▼
        ┌─────────────────────────────────┐
        │   EUREKA SERVICE REGISTRY       │
        │    (Service Discovery)          │
        │     Port: 8761                  │
        └─────────────────────────────────┘
```

## Service Flow Diagram

```
User Request Flow:
==================

User (Browser)
     ↓
Frontend (React - Port 5173)
     ↓
API Gateway (Port 9191)
     ↓
┌─────────────────────────────────────────────┐
│              MICROSERVICES                  │
│                                             │
│  Auth → Theatre → Movie → Show → Booking   │
│                                             │
└─────────────────────────────────────────────┘
     ↓
Databases (MySQL + MongoDB)
     ↓
Notification Service (WhatsApp)
```

## Booking Flow Sequence

```
┌────────┐    ┌─────────┐    ┌──────────┐    ┌─────────┐    ┌─────────┐
│  User  │    │ Gateway │    │  Shows   │    │ Booking │    │ Notify  │
└───┬────┘    └────┬────┘    └────┬─────┘    └────┬────┘    └────┬────┘
    │              │              │               │              │
    │  Browse      │              │               │              │
    │  Movies      │              │               │              │
    │─────────────>│              │               │              │
    │              │  Get Shows   │               │              │
    │              │─────────────>│               │              │
    │              │   Shows      │               │              │
    │<─────────────│<─────────────│               │              │
    │              │              │               │              │
    │  Select Seats│              │               │              │
    │─────────────>│              │               │              │
    │              │  Lock Seats  │               │              │
    │              │──────────────────────────────>              │
    │              │  Seats Locked│               │              │
    │<─────────────│<─────────────│───────────────│              │
    │              │              │               │              │
    │  Confirm     │              │               │              │
    │─────────────>│              │               │              │
    │              │  Create Booking              │              │
    │              │──────────────────────────────>              │
    │              │              │               │ Send Ticket  │
    │              │              │               │─────────────>│
    │  Booking     │              │               │              │
    │  Confirmed   │              │               │              │
    │<─────────────│<─────────────│───────────────│              │
    │              │              │               │              │
```

## Database Schema Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATABASES                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐ │
│  │ bookmyshow_auth │  │bookmyshow_theatre│ │    show_db     │ │
│  │     (MySQL)     │  │     (MySQL)     │  │    (MySQL)     │ │
│  ├─────────────────┤  ├─────────────────┤  ├─────────────────┤ │
│  │ • users         │  │ • theatres      │  │ • shows        │ │
│  │   - id          │  │   - id          │  │   - id         │ │
│  │   - username    │  │   - name        │  │   - movie_id   │ │
│  │   - password    │  │   - address     │  │   - theatre_id │ │
│  │   - role        │  │   - city        │  │   - show_date  │ │
│  │   - phone       │  │   - screen_type │  │   - show_time  │ │
│  │   - city        │  │   - total_seats │  │   - price      │ │
│  └─────────────────┘  └─────────────────┘  └─────────────────┘ │
│                                                                  │
│  ┌─────────────────┐  ┌─────────────────────────────────────┐  │
│  │   booking_db    │  │           movie_db (MongoDB)        │  │
│  │     (MySQL)     │  ├─────────────────────────────────────┤  │
│  ├─────────────────┤  │ • movies (collection)               │  │
│  │ • bookings      │  │   - _id                             │  │
│  │   - id          │  │   - title                           │  │
│  │   - show_id     │  │   - genre                           │  │
│  │   - user_id     │  │   - language                        │  │
│  │   - seats       │  │   - durationMinutes                 │  │
│  │   - amount      │  │   - rating                          │  │
│  │   - status      │  │   - releaseDate                     │  │
│  │                 │  │   - posterUrl                       │  │
│  │ • seat_locks    │  │   - cast                            │  │
│  │   - seat_number │  │                                     │  │
│  │   - show_id     │  │                                     │  │
│  │   - expires_at  │  │                                     │  │
│  └─────────────────┘  └─────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Port Summary

| Component | Port | Description |
|-----------|------|-------------|
| Frontend | 5173 | React development server |
| API Gateway | 9191 | Main entry point for all APIs |
| Service Registry | 8761 | Eureka service discovery |
| Auth Service | 8081 | User authentication & JWT |
| Theatre Service | 8082 | Theatre management |
| Movie Service | 8083 | Movie catalog (MongoDB) |
| Show Service | 8084 | Show scheduling |
| Booking Service | 8085 | Booking & seat locking |
| Notification Service | 8086 | WhatsApp notifications |
| Config Server | 8888 | Centralized configuration |
| Zipkin | 9411 | Distributed tracing |
