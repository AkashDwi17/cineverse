---
title: "Installation"
permalink: /docs/installation/
excerpt: "How to install and set up Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# Installation Guide

Follow these steps to set up the Cineverse movie booking platform on your local machine.

## Prerequisites

Ensure you have the following software installed:

1. **Java 21**: Required for the backend microservices.
2. **Node.js (v18+)**: Required for the frontend.
3. **MySQL 8.0+**: Required for SQL databases.
4. **MongoDB**: Required for the movie database.
5. **Git**: To clone the repository.

## Service Ports

| Service | Port |
|---------|------|
| Service Registry (Eureka) | 8761 |
| API Gateway | 9191 |
| Auth Service | 8081 |
| Theatre Service | 8082 |
| Movie Service | 8083 |
| Show Service | 8084 |
| Booking Service | 8085 |
| Notification Service | 8086 |
| Config Server | 8888 |
| Zipkin (Tracing) | 9411 |
| Frontend | 5173 |

## 1. Database Setup

### MySQL Databases

1. Open your MySQL client (e.g., MySQL Workbench, command line).
2. Create the required databases:

    ```sql
    CREATE DATABASE bookmyshow_auth;
    CREATE DATABASE bookmyshow_theatre;
    CREATE DATABASE show_db;
    CREATE DATABASE booking_db;
    ```

### MongoDB

1. Start MongoDB service.
2. The `movie_db` database will be created automatically when the Movie Service starts.

## 2. Backend Setup

### Start Services in Order

1. **Start Eureka Server (Service Registry)**:
    ```bash
    cd backend/service-registry
    ./mvnw spring-boot:run
    ```

2. **Start API Gateway**:
    ```bash
    cd backend/api-gateway
    ./mvnw spring-boot:run
    ```

3. **Start Auth Service**:
    ```bash
    cd backend/auth-service
    ./mvnw spring-boot:run
    ```

4. **Start remaining services** (Theatre, Movie, Show, Booking, Notification):
    ```bash
    cd backend/<service-name>
    ./mvnw spring-boot:run
    ```

For Windows, use `mvnw.cmd spring-boot:run` instead.

## 3. Frontend Setup

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm run dev
    ```

    *The frontend will be accessible at `http://localhost:5173`.*

## Troubleshooting

* **Port Conflicts**: Ensure the required ports are free.
* **Database Connection**: Verify MySQL/MongoDB credentials in each service's `application.properties`.
* **Eureka Issues**: Ensure Service Registry is running before starting other services.
* **Permission Denied (Linux/Mac)**: Run `chmod +x mvnw` if the wrapper is not executable.
