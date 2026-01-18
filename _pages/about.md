---
layout: single
title: "About"
permalink: /about/
---

## About Cineverse

**Cineverse** is a modern movie booking platform designed to provide a seamless experience for discovering, exploring, and booking movie tickets. Built with cutting-edge microservices architecture, it ensures scalability, reliability, and an exceptional user experience.

---

## 📋 Project Details

**Course Name**: PG-DAC  
**Batch Name**: August 2025  
**Project Name**: Cineverse - Movie Booking System

---

## 👥 Team Members

| Sr. No | Name | PRN | GitHub |
|--------|------|-----|--------|
| 01 | Akash Dwivedi | 250850120018 | [@AkashDwi17](https://github.com/AkashDwi17) |
| 02 | Mayuri Narale | 250850120101 | [@mayurinarale](https://github.com/mayurinarale) |
| 03 | Pranavi | 250850120124 | [@Pranavi5494](https://github.com/Pranavi5494) |
| 04 | Pruthvi Bhat | 250850120129 | [@PruthviGBhat](https://github.com/PruthviGBhat) |
| 05 | Raghavendra | 250850120130 | [@raghvendru](https://github.com/raghvendru) |

---

## 📖 Project Description

Cineverse is a comprehensive movie booking solution that provides:

1. **User-Friendly Interface** - Browse movies, view showtimes, and book tickets effortlessly
2. **Microservices Architecture** - Scalable and maintainable backend services
3. **Real-Time Availability** - Check seat availability and book instantly
4. **Secure Transactions** - Safe and reliable payment processing
5. **Modern Tech Stack** - Built using React.js, Spring Boot, and MySQL

---

## 💻 Technology Stack

### Frontend
- **React.js** - Modern UI framework
- **HTML5 & CSS3** - Responsive design
- **JavaScript (ES6+)** - Interactive components

### Backend
- **Spring Boot** - Java-based microservices framework
- **Spring Cloud** - Service discovery and configuration
- **Spring Security** - Authentication and authorization
- **JWT** - Secure token-based authentication
- **Spring Data JPA** - Database operations

### Database
- **MySQL 8.0+** - Relational database management

### Infrastructure
- **Service Registry (Eureka)** - Port 8761
- **API Gateway** - Port 9191
- **Config Server** - Port 8888
- **User Service** - Port 8080
- **Zipkin (Tracing)** - Port 9411

### Development Tools
- **IntelliJ IDEA / Eclipse** - Java development
- **Visual Studio Code** - Frontend development
- **Git & GitHub** - Version control
- **Maven** - Dependency management
- **npm** - Package management

---

## 🎯 Key Features

### For Users
- ✅ **Browse Movies** - Explore latest and upcoming movies
- ✅ **View Showtimes** - Check available shows at nearby theaters
- ✅ **Book Tickets** - Easy and quick ticket booking
- ✅ **Seat Selection** - Choose your preferred seats
- ✅ **Booking History** - View past and upcoming bookings
- ✅ **User Profile** - Manage personal information and preferences

### For Administrators
- ✅ **Movie Management** - Add, edit, and remove movies
- ✅ **Theater Management** - Configure theaters and screens
- ✅ **Show Management** - Schedule shows and manage timings
- ✅ **Booking Reports** - Track bookings and revenue
- ✅ **User Management** - Handle user accounts and permissions

### System Features
- 🔒 **Secure Authentication** - JWT-based login system
- 🔒 **Role-Based Access** - Separate admin and user privileges
- 🔒 **Encrypted Data** - BCrypt password hashing
- 📊 **Distributed Tracing** - Zipkin integration for monitoring
- ⚡ **Service Discovery** - Eureka-based microservices

---

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────┐
│                  CINEVERSE MOVIE BOOKING                │
└─────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   ┌─────────┐        ┌──────────┐       ┌──────────┐
   │ React.js│◄──────►│   API    │◄─────►│  MySQL   │
   │Frontend │        │ Gateway  │       │ Database │
   └─────────┘        └──────────┘       └──────────┘
        │                   │                   │
    UI Layer          Microservices       Data Storage
    Components        Spring Boot          Transactions
    State Mgmt        Service Mesh         Relationships
```

### Microservices Overview

```
┌────────────────┐   ┌────────────────┐   ┌────────────────┐
│ Service        │   │   API          │   │   Config       │
│ Registry       │   │   Gateway      │   │   Server       │
│ (Eureka:8761)  │   │   (:9191)      │   │   (:8888)      │
└────────────────┘   └────────────────┘   └────────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
        ┌───────────────────────────────────────┐
        │           Business Services           │
        ├───────────────────────────────────────┤
        │   User Service  │  Movie Service      │
        │   Booking Service │ Theater Service   │
        └───────────────────────────────────────┘
                            │
                            ▼
                   ┌────────────────┐
                   │    Zipkin      │
                   │   (:9411)      │
                   └────────────────┘
```

---

## 🔗 Repository & Links

- **GitHub Repository**: [AkashDwi17/cineverse](https://github.com/AkashDwi17/cineverse)
- **Documentation Site**: [Cineverse Docs](https://akashdwi17.github.io/cineverse)

---
