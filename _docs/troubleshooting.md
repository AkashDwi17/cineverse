---
title: "Troubleshooting Guide"
permalink: /docs/troubleshooting/
excerpt: "Common issues and solutions for Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# Troubleshooting Guide

## Backend Issues

### Port Already in Use

**Error**: `Port 8082 is already in use`

**Solutions**:
```bash
# Windows
netstat -ano | findstr :8082
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8082
kill -9 <PID>
```

---

### Database Connection Failed

**Error**: `Communications link failure`

**Solutions**:
1. Check MySQL is running
2. Verify database exists
3. Check credentials in `application.properties`
4. Test connection: `mysql -u root -p`

---

### Service Not Registering in Eureka

**Error**: `No instances available for service-name`

**Solutions**:
1. Check Eureka is running on port 8761
2. Verify `eureka.client.service-url.defaultZone` in `application.properties`
3. Wait 30 seconds for registration
4. Check Eureka dashboard: http://localhost:8761

---

### JWT Token Validation Failed

**Error**: `Invalid JWT signature`

**Solutions**:
1. Ensure JWT secret is identical across all services
2. Check token hasn't expired
3. Verify token format is correct
4. Regenerate token by logging in again

---

## Frontend Issues

### CORS Error

**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solutions**:
1. Check API Gateway CORS configuration
2. Verify frontend origin in `application.properties`:
```properties
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedOrigins=http://localhost:5173
```

---

### API Calls Failing

**Error**: `Network Error` or `404 Not Found`

**Solutions**:
1. Check backend services are running
2. Verify `VITE_BASE_URL` in `.env`
3. Check API Gateway is running on port 9191
4. Inspect browser console for detailed errors

---

### Token Not Found

**Error**: `Unauthorized` on protected routes

**Solutions**:
1. Check localStorage for `cineverse_token`
2. Login again to get new token
3. Clear localStorage and re-login

---

## Database Issues

### MySQL Connection Refused

**Solutions**:
```bash
# Start MySQL
# Windows
net start MySQL80

# Linux
sudo systemctl start mysql

# Mac
brew services start mysql
```

---

### MongoDB Connection Failed

**Solutions**:
```bash
# Start MongoDB
# Windows
net start MongoDB

# Linux
sudo systemctl start mongod

# Mac
brew services start mongodb-community
```

---

## Build Issues

### Maven Build Failed

**Error**: `Failed to execute goal`

**Solutions**:
1. Clean and rebuild:
```bash
mvn clean install
```
2. Update dependencies:
```bash
mvn dependency:purge-local-repository
```
3. Check Java version: `java -version` (should be 21)

---

### npm Install Failed

**Error**: `ERESOLVE unable to resolve dependency tree`

**Solutions**:
```bash
# Clear cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use legacy peer deps
npm install --legacy-peer-deps
```

---

## Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| `Seat already booked` | Seat taken by another user | Refresh and select different seats |
| `User not found` | Invalid username | Check username spelling |
| `Invalid credentials` | Wrong password | Verify password |
| `Service unavailable` | Microservice down | Check service is running |
| `Token expired` | JWT token expired | Login again |

---

## Logging

Enable debug logging:

```properties
logging.level.org.springframework=DEBUG
logging.level.com.dac=DEBUG
```

---

## Getting Help

1. Check Eureka dashboard for service status
2. Review application logs
3. Test endpoints with Postman
4. Check browser console for frontend errors
