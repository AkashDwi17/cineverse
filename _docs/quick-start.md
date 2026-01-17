---
title: "Quick Start"
permalink: /docs/quick-start/
excerpt: "Get up and running quickly with Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# Quick Start Guide

This guide will help you verify the application flow by simulating a real-world movie booking scenario.

## Prerequisites
Ensure you have completed the [Installation Guide](/docs/installation/) and all services are running.

* **Frontend**: http://localhost:5173
* **API Gateway**: http://localhost:9191
* **Eureka Dashboard**: http://localhost:8761

## Walkthrough

### 1. Admin: Add a Theatre

1. Login with Admin credentials.
2. Navigate to the Admin Dashboard.
3. Click "Add Theatre" and enter:
   * Name: "PVR Bellandur"
   * Address: "Bellandur, Bangalore"
   * City: "Bangalore"
   * Screen Type: "TWO_D"
   * Total Seats: 250

### 2. Admin: Add a Movie

1. Navigate to "Movies" section.
2. Click "Add Movie" and enter:
   * Title: "Avengers"
   * Description: "Superhero movie"
   * Language: "English"
   * Genre: "Action"
   * Duration: 180 minutes

### 3. Admin: Create a Show

1. Navigate to "Shows" section.
2. Click "Create Show" and select:
   * Movie: "Avengers"
   * Theatre: "PVR Bellandur"
   * Date and Time
   * Ticket Price: ₹200

### 4. User: Register & Login

1. Open an Incognito window or log out.
2. Navigate to the Registration page.
3. Fill in your details and register.
4. Login with your new credentials.

### 5. User: Book Tickets

1. Browse available movies.
2. Select "Avengers".
3. Choose a show time and theatre.
4. Select your seats (e.g., A1, A2).
5. Confirm your booking.
6. Receive WhatsApp ticket notification.

---

## Default Accounts

| Role | Username | Password |
|:-----|:---------|:---------|
| **Admin** | `admin@cineverse.com` | `admin@123` |
| **User** | `user@cineverse.com` | `user@123` |

## API Access

All backend APIs are accessible through the API Gateway at `http://localhost:9191`:

* `/api/auth/**` - Authentication
* `/api/movies/**` - Movie management
* `/api/theatres/**` - Theatre management
* `/api/shows/**` - Show scheduling
* `/api/bookings/**` - Bookings
* `/api/notify/**` - Notifications
