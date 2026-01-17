---
title: "Configuration Guide"
permalink: /docs/backend/configuration/
excerpt: "Complete configuration guide for all Cineverse microservices"
last_modified_at: 2026-01-18
toc: true
---

# Configuration Guide

This guide covers all configuration settings for the Cineverse microservices platform.

## Overview

Each microservice has its own `application.properties` file located in `src/main/resources/`. Configuration includes:
- Server ports
- Database connections
- Eureka service registry
- JWT secrets
- External API keys

---

## Service Ports

| Service | Port | Description |
|---------|------|-------------|
| Service Registry (Eureka) | 8761 | Service discovery |
| API Gateway | 9191 | Unified entry point |
| Auth Service | 8082 | Authentication |
| Theatre Service | 8083 | Theatre management |
| Movie Service | 8084 | Movie catalog |
| Show Service | 8085 | Show scheduling |
| Booking Service | 8086 | Booking management |

---

## Auth Service Configuration

**File**: `backend/auth-service/src/main/resources/application.properties`

```properties
# Application
spring.application.name=auth-service
server.port=8082

# Eureka Service Registry
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
eureka.instance.hostname=localhost
eureka.instance.prefer-ip-address=true

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/bookmyshow_auth?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# JWT Secret (Base64 encoded, 256-bit)
jwt.secret=Lvnu9OxA/Z1tvC+jXnbo9gcpSFI8BU8pPlgIeC/UyCg=

# Swagger/OpenAPI
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
spring.main.allow-bean-definition-overriding=true

# Logging
logging.level.org.springframework=INFO
```

### Key Configuration Points

- **Database URL**: Update with your MySQL credentials
- **JWT Secret**: Generate a secure 256-bit key for production
- **Hibernate DDL**: Use `update` for development, `validate` for production

---

## Theatre Service Configuration

**File**: `backend/theatre/src/main/resources/application.properties`

```properties
# Application
spring.application.name=theatre-service
server.port=8083

# Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/bookmyshow_theatre?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Swagger
springdoc.swagger-ui.path=/swagger-ui/index.html
```

---

## Movie Service Configuration

**File**: `backend/movieService/src/main/resources/application.properties`

```properties
# Application
spring.application.name=movie-service
server.port=8084

# Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true

# MongoDB
spring.data.mongodb.uri=mongodb://localhost:27017/movie_db
spring.data.mongodb.database=movie_db

# Cloudinary (Image Upload)
cloudinary.cloud-name=YOUR_CLOUD_NAME
cloudinary.api-key=YOUR_API_KEY
cloudinary.api-secret=YOUR_API_SECRET

# Swagger
springdoc.api-docs.enabled=true
springdoc.swagger-ui.enabled=true
```

### Cloudinary Setup

1. Sign up at [cloudinary.com](https://cloudinary.com)
2. Get your credentials from the dashboard
3. Update the configuration with your values

---

## Show Service Configuration

**File**: `backend/Show-service/src/main/resources/application.properties`

```properties
# Application
spring.application.name=show-service
server.port=8085

# Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/show_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Secret (must match auth-service)
jwt.secret=Lvnu9OxA/Z1tvC+jXnbo9gcpSFI8BU8pPlgIeC/UyCg=
```

---

## Booking Service Configuration

**File**: `backend/BookingService/src/main/resources/application.properties`

```properties
# Application
spring.application.name=booking-service
server.port=8086

# Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
eureka.instance.hostname=localhost
eureka.instance.prefer-ip-address=true

# MySQL Database
spring.datasource.url=jdbc:mysql://localhost:3306/booking_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# JPA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# JWT Secret (must match auth-service)
jwt.secret=Lvnu9OxA/Z1tvC+jXnbo9gcpSFI8BU8pPlgIeC/UyCg=

# Swagger
springdoc.swagger-ui.path=/swagger-ui/index.html
springdoc.api-docs.enabled=true

# Stripe Payment (Optional)
stripe.secret.key=YOUR_STRIPE_SECRET_KEY
stripe.publishable.key=YOUR_STRIPE_PUBLISHABLE_KEY
stripe.success.url=http://localhost:5173/payment-success
stripe.cancel.url=http://localhost:5173/payment-cancel
```

---

## API Gateway Configuration

**File**: `backend/api-gateway/src/main/resources/application.properties`

```properties
# Application
spring.application.name=api-gateway
server.port=9191
spring.main.web-application-type=reactive

# Eureka
eureka.client.register-with-eureka=true
eureka.client.fetch-registry=true
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Gateway Discovery
spring.cloud.gateway.discovery.locator.enabled=false

# HTTP Client Timeouts
spring.cloud.gateway.httpclient.connect-timeout=10000
spring.cloud.gateway.httpclient.response-timeout=10s

# Route 0 - Auth Service
spring.cloud.gateway.routes[0].id=auth-service
spring.cloud.gateway.routes[0].uri=lb://auth-service
spring.cloud.gateway.routes[0].predicates[0]=Path=/api/auth/**

# Route 1 - Theatre Service
spring.cloud.gateway.routes[1].id=theatre-service
spring.cloud.gateway.routes[1].uri=lb://theatre-service
spring.cloud.gateway.routes[1].predicates[0]=Path=/api/theatres/**

# Route 2 - Movie Service
spring.cloud.gateway.routes[2].id=movie-service
spring.cloud.gateway.routes[2].uri=lb://movie-service
spring.cloud.gateway.routes[2].predicates[0]=Path=/api/movies/**

# Route 3 - Show Service
spring.cloud.gateway.routes[3].id=show-service
spring.cloud.gateway.routes[3].uri=lb://show-service
spring.cloud.gateway.routes[3].predicates[0]=Path=/api/shows/**

# Route 4 - Booking Service
spring.cloud.gateway.routes[4].id=booking-service
spring.cloud.gateway.routes[4].uri=lb://booking-service
spring.cloud.gateway.routes[4].predicates[0]=Path=/api/bookings/**

# Route 5 - Booking Payments
spring.cloud.gateway.routes[5].id=booking-payment
spring.cloud.gateway.routes[5].uri=lb://booking-service
spring.cloud.gateway.routes[5].predicates[0]=Path=/api/payments/**

# CORS Configuration
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedOrigins=http://localhost:5173
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedMethods=*
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedHeaders=*
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowCredentials=true
spring.cloud.gateway.globalcors.add-to-simple-url-handler-mapping=true
```

### Gateway Routing Explanation

- **lb://** - Load balancer prefix for Eureka service discovery
- **predicates** - URL path matching rules
- **CORS** - Allows frontend at localhost:5173 to make requests

---

## Service Registry (Eureka) Configuration

**File**: `backend/service-registry/src/main/resources/application.properties`

```properties
# Application
spring.application.name=service-registry
server.port=8761

# Eureka Server
eureka.client.register-with-eureka=false
eureka.client.fetch-registry=false
eureka.server.enable-self-preservation=false
```

---

## Environment Variables

For production, use environment variables instead of hardcoding sensitive values:

```bash
# Database
export DB_USERNAME=your_username
export DB_PASSWORD=your_password

# JWT
export JWT_SECRET=your_secure_256bit_key

# Cloudinary
export CLOUDINARY_CLOUD_NAME=your_cloud_name
export CLOUDINARY_API_KEY=your_api_key
export CLOUDINARY_API_SECRET=your_api_secret

# Stripe
export STRIPE_SECRET_KEY=your_stripe_secret
export STRIPE_PUBLISHABLE_KEY=your_stripe_public_key
```

Update `application.properties` to use environment variables:

```properties
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}
jwt.secret=${JWT_SECRET}
```

---

## Profile-Based Configuration

Create environment-specific configurations:

### Development Profile

**File**: `application-dev.properties`

```properties
spring.jpa.show-sql=true
logging.level.org.springframework=DEBUG
logging.level.com.dac=DEBUG
```

### Production Profile

**File**: `application-prod.properties`

```properties
spring.jpa.show-sql=false
spring.jpa.hibernate.ddl-auto=validate
logging.level.org.springframework=WARN
logging.level.com.dac=INFO
```

**Run with profile**:
```bash
java -jar -Dspring.profiles.active=prod service.jar
```

---

## Database Setup

### MySQL Databases

Create required databases:

```sql
CREATE DATABASE bookmyshow_auth;
CREATE DATABASE bookmyshow_theatre;
CREATE DATABASE show_db;
CREATE DATABASE booking_db;
```

### MongoDB

```bash
# Start MongoDB
mongod

# Create database (auto-created on first insert)
mongosh
use movie_db
```

---

## Generating JWT Secret

Generate a secure 256-bit key:

```bash
# Using OpenSSL
openssl rand -base64 32

# Using Java
java -cp auth-service.jar com.dac.auth_service.JwtSecretGenerator
```

> **Important**: Use the same JWT secret across all services that validate tokens.

---

## CORS Configuration

Update CORS settings in API Gateway for production:

```properties
# Production frontend URL
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedOrigins=https://your-domain.com
```

---

## Troubleshooting Configuration

### Service Not Registering with Eureka

Check:
1. Eureka server is running on port 8761
2. `eureka.client.service-url.defaultZone` is correct
3. Network connectivity between services

### Database Connection Failed

Check:
1. MySQL/MongoDB is running
2. Database exists
3. Credentials are correct
4. Port is accessible (MySQL: 3306, MongoDB: 27017)

### JWT Token Validation Failed

Check:
1. JWT secret is identical across all services
2. Secret is Base64 encoded 256-bit key
3. Token is not expired

---

## Best Practices

1. **Never commit secrets** - Use environment variables or secret management tools
2. **Use different secrets** for dev and production
3. **Enable SSL/TLS** in production
4. **Disable SQL logging** in production (`spring.jpa.show-sql=false`)
5. **Use connection pooling** for database connections
6. **Set appropriate timeouts** for HTTP clients
7. **Monitor service health** through Eureka dashboard
