---
title: "Deployment Guide"
permalink: /docs/deployment/
excerpt: "Complete deployment guide for Cineverse platform"
last_modified_at: 2026-01-18
toc: true
---

# Deployment Guide

## Prerequisites

- Java 21
- Node.js 18+
- MySQL 8.0+
- MongoDB 4.4+
- Maven 3.8+

---

## Development Deployment

### 1. Start Databases

```bash
# MySQL
mysql -u root -p

# MongoDB
mongod
```

### 2. Start Backend Services (in order)

```bash
# 1. Eureka Server
cd backend/service-registry
mvn spring-boot:run

# 2. API Gateway
cd backend/api-gateway
mvn spring-boot:run

# 3-7. Microservices (any order)
cd backend/auth-service && mvn spring-boot:run
cd backend/theatre && mvn spring-boot:run
cd backend/movieService && mvn spring-boot:run
cd backend/Show-service && mvn spring-boot:run
cd backend/BookingService && mvn spring-boot:run
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Production Deployment

### Docker Deployment

**Dockerfile** (example for auth-service):

```dockerfile
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/auth-service-1.0.0.jar app.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**docker-compose.yml**:

```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
  
  mongodb:
    image: mongo:4.4
    ports:
      - "27017:27017"
  
  eureka:
    build: ./backend/service-registry
    ports:
      - "8761:8761"
  
  api-gateway:
    build: ./backend/api-gateway
    ports:
      - "9191:9191"
    depends_on:
      - eureka
  
  auth-service:
    build: ./backend/auth-service
    environment:
      DB_PASSWORD: ${DB_PASSWORD}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - mysql
      - eureka
  
  frontend:
    build: ./frontend
    ports:
      - "80:80"
```

---

## Environment Variables

Create `.env` file:

```bash
DB_PASSWORD=your_secure_password
JWT_SECRET=your_256bit_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Health Checks

Monitor services at:
- Eureka Dashboard: http://localhost:8761
- API Gateway: http://localhost:9191/actuator/health

---

## Summary

1. Start databases
2. Start Eureka
3. Start API Gateway
4. Start microservices
5. Start frontend
