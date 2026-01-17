---
title: "Error Handling"
permalink: /docs/backend/error-handling/
excerpt: "Error handling and validation patterns in Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# Error Handling Guide

This document covers error handling patterns, custom exceptions, validation, and error response formats across the Cineverse platform.

## Error Response Format

All services return consistent error responses:

```json
{
  "error": "Error message description",
  "status": 404,
  "timestamp": "2026-01-18T00:35:00",
  "path": "/api/movies/invalid-id"
}
```

---

## Global Exception Handler

Each service implements a `@RestControllerAdvice` to handle exceptions globally.

**File**: `GlobalExceptionHandler.java`

```java
@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(
        ResourceNotFoundException ex,
        WebRequest request
    ) {
        log.error("Resource not found: {}", ex.getMessage());
        
        ErrorResponse error = ErrorResponse.builder()
            .error(ex.getMessage())
            .status(HttpStatus.NOT_FOUND.value())
            .timestamp(LocalDateTime.now())
            .path(request.getDescription(false))
            .build();
            
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(
        Exception ex,
        WebRequest request
    ) {
        log.error("Unexpected error: ", ex);
        
        ErrorResponse error = ErrorResponse.builder()
            .error("Internal server error")
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .timestamp(LocalDateTime.now())
            .path(request.getDescription(false))
            .build();
            
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
```

---

## Custom Exceptions

### Resource Not Found Exception

**File**: `exception/ResourceNotFoundException.java`

```java
public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String resource, String field, Object value) {
        super(String.format("%s not found with %s: %s", resource, field, value));
    }
}
```

**Usage**:
```java
public MovieResponse get(String id) {
    return movieRepository.findById(id)
        .map(this::mapToResponse)
        .orElseThrow(() -> new ResourceNotFoundException("Movie", "id", id));
}
```

**Response** (404 Not Found):
```json
{
  "error": "Movie not found with id: 69246514c412948190c5fb80",
  "status": 404,
  "timestamp": "2026-01-18T00:35:00",
  "path": "/api/movies/69246514c412948190c5fb80"
}
```

---

### Seat Already Booked Exception

**File**: `exception/SeatAlreadyBookedException.java`

```java
public class SeatAlreadyBookedException extends RuntimeException {
    public SeatAlreadyBookedException(String seat, Long showId) {
        super(String.format("Seat %s is already booked for show %d", seat, showId));
    }
}
```

**Usage**:
```java
if (isSeatBooked(seat, showId)) {
    throw new SeatAlreadyBookedException(seat, showId);
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Seat A1 is already booked for show 5",
  "status": 400,
  "timestamp": "2026-01-18T00:35:00",
  "path": "/api/bookings/lock"
}
```

---

### Service Unavailable Exception

**File**: `exception/ServiceUnavailableException.java`

```java
public class ServiceUnavailableException extends RuntimeException {
    public ServiceUnavailableException(String service) {
        super(String.format("%s is currently unavailable", service));
    }
}
```

**Usage**:
```java
try {
    MovieResponse movie = movieServiceClient.getMovie(movieId);
} catch (Exception e) {
    throw new ServiceUnavailableException("Movie Service");
}
```

---

### Bad Request Exception

**File**: `exception/BadRequestException.java`

```java
public class BadRequestException extends RuntimeException {
    public BadRequestException(String message) {
        super(message);
    }
}
```

**Usage**:
```java
if (request.getSeats().isEmpty()) {
    throw new BadRequestException("At least one seat must be selected");
}
```

---

## Validation

### Request Validation

Use Jakarta Bean Validation annotations:

```java
public record TheatreRequest(
    @NotBlank(message = "Theatre name is required")
    String name,
    
    @NotBlank(message = "Address is required")
    String address,
    
    @NotBlank(message = "City is required")
    String city,
    
    @NotNull(message = "Screen type is required")
    ScreenType screenType,
    
    @Min(value = 50, message = "Theatre must have at least 50 seats")
    @Max(value = 500, message = "Theatre cannot have more than 500 seats")
    Integer totalSeats
) {}
```

**Controller**:
```java
@PostMapping
public TheatreResponse create(@Valid @RequestBody TheatreRequest request) {
    return theatreService.create(request);
}
```

**Validation Error Response** (400 Bad Request):
```json
{
  "error": "Validation failed",
  "status": 400,
  "timestamp": "2026-01-18T00:35:00",
  "path": "/api/theatres",
  "errors": {
    "name": "Theatre name is required",
    "totalSeats": "Theatre must have at least 50 seats"
  }
}
```

---

### Validation Exception Handler

```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ErrorResponse> handleValidationErrors(
    MethodArgumentNotValidException ex
) {
    Map<String, String> errors = new HashMap<>();
    
    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage())
    );
    
    ErrorResponse response = ErrorResponse.builder()
        .error("Validation failed")
        .status(HttpStatus.BAD_REQUEST.value())
        .timestamp(LocalDateTime.now())
        .errors(errors)
        .build();
        
    return ResponseEntity.badRequest().body(response);
}
```

---

## HTTP Status Codes

### Success Codes

| Code | Status | Usage |
|------|--------|-------|
| 200 | OK | Successful GET, PUT requests |
| 201 | Created | Successful POST (resource created) |
| 204 | No Content | Successful DELETE |

### Client Error Codes

| Code | Status | Usage | Example |
|------|--------|-------|---------|
| 400 | Bad Request | Invalid request data | Missing required field |
| 401 | Unauthorized | Authentication failed | Invalid credentials |
| 403 | Forbidden | Insufficient permissions | Non-admin accessing admin endpoint |
| 404 | Not Found | Resource doesn't exist | Movie ID not found |
| 409 | Conflict | Resource conflict | Username already exists |

### Server Error Codes

| Code | Status | Usage | Example |
|------|--------|-------|---------|
| 500 | Internal Server Error | Unexpected server error | Database connection failed |
| 503 | Service Unavailable | Service temporarily unavailable | Dependent service down |

---

## Error Scenarios

### Scenario 1: User Not Found

**Request**:
```
GET /api/auth/user/nonexistent@example.com
```

**Response** (404 Not Found):
```json
{
  "error": "User not found"
}
```

---

### Scenario 2: Invalid Credentials

**Request**:
```json
POST /api/auth/login
{
  "username": "user@example.com",
  "password": "wrongpassword"
}
```

**Response** (401 Unauthorized):
```json
{
  "error": "Invalid credentials"
}
```

---

### Scenario 3: Username Already Exists

**Request**:
```json
POST /api/auth/signup
{
  "username": "existing@example.com",
  "password": "password123"
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Username already exists"
}
```

---

### Scenario 4: Seat Already Locked

**Request**:
```json
POST /api/bookings/lock
{
  "showId": 1,
  "userId": 5,
  "seats": ["A1", "A2"]
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Seat A1 is already locked or booked"
}
```

---

### Scenario 5: Movie Not Found

**Request**:
```
GET /api/movies/invalid-id
```

**Response** (404 Not Found):
```json
{
  "error": "Movie not found with id: invalid-id"
}
```

---

### Scenario 6: Validation Errors

**Request**:
```json
POST /api/theatres
{
  "name": "",
  "totalSeats": 10
}
```

**Response** (400 Bad Request):
```json
{
  "error": "Validation failed",
  "status": 400,
  "timestamp": "2026-01-18T00:35:00",
  "path": "/api/theatres",
  "errors": {
    "name": "Theatre name is required",
    "address": "Address is required",
    "city": "City is required",
    "totalSeats": "Theatre must have at least 50 seats"
  }
}
```

---

### Scenario 7: Unauthorized Access

**Request** (no token):
```
GET /api/bookings/user/5
```

**Response** (401 Unauthorized):
```json
{
  "error": "Unauthorized"
}
```

---

### Scenario 8: Forbidden Access

**Request** (USER role trying to create movie):
```
POST /api/movies
Authorization: Bearer <user_token>
```

**Response** (403 Forbidden):
```json
{
  "error": "Access denied. Admin role required."
}
```

---

## Inter-Service Error Handling

### WebClient Error Handling

When calling other services using WebClient:

```java
public ShowDto getShowById(Long showId) {
    try {
        return webClient.get()
            .uri("/api/shows/" + showId)
            .retrieve()
            .bodyToMono(ShowDto.class)
            .block();
    } catch (WebClientResponseException.NotFound e) {
        throw new ResourceNotFoundException("Show", "id", showId);
    } catch (WebClientException e) {
        log.error("Failed to fetch show: {}", e.getMessage());
        throw new ServiceUnavailableException("Show Service");
    }
}
```

---

## Logging Best Practices

### Log Levels

```java
// ERROR - Serious issues requiring immediate attention
log.error("Database connection failed", exception);

// WARN - Potentially harmful situations
log.warn("Failed login attempt for user: {}", username);

// INFO - Informational messages
log.info("User {} successfully logged in", username);

// DEBUG - Detailed information for debugging
log.debug("Processing booking for show: {}", showId);
```

### Structured Logging

```java
log.info("Booking created - userId: {}, showId: {}, seats: {}, amount: {}",
    userId, showId, seats, amount);
```

### Don't Log Sensitive Data

```java
// BAD
log.info("User password: {}", password);
log.info("JWT token: {}", token);

// GOOD
log.info("User {} authenticated successfully", username);
log.info("Token generated for user {}", username);
```

---

## Error Monitoring

### Recommended Tools

1. **Spring Boot Actuator** - Health checks and metrics
2. **Sentry** - Error tracking and monitoring
3. **ELK Stack** - Centralized logging (Elasticsearch, Logstash, Kibana)
4. **Prometheus + Grafana** - Metrics and alerting

### Health Check Endpoint

```java
@RestController
@RequestMapping("/actuator")
public class HealthController {
    
    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "service", "booking-service"
        ));
    }
}
```

---

## Testing Error Scenarios

### Unit Test Example

```java
@Test
void shouldThrowExceptionWhenMovieNotFound() {
    when(movieRepository.findById("invalid-id"))
        .thenReturn(Optional.empty());
    
    assertThrows(ResourceNotFoundException.class, () ->
        movieService.get("invalid-id")
    );
}
```

### Integration Test Example

```java
@Test
void shouldReturn404WhenMovieNotFound() throws Exception {
    mockMvc.perform(get("/api/movies/invalid-id"))
        .andExpect(status().isNotFound())
        .andExpect(jsonPath("$.error").value("Movie not found with id: invalid-id"));
}
```

---

## Best Practices

1. **Use specific exceptions** - Don't catch generic `Exception` unless necessary
2. **Provide meaningful messages** - Help users understand what went wrong
3. **Log errors appropriately** - Use correct log levels
4. **Don't expose sensitive info** - Never return stack traces to clients
5. **Handle all exceptions** - Use global exception handler as fallback
6. **Validate early** - Validate input at controller level
7. **Return consistent formats** - Use same error response structure
8. **Use HTTP status codes correctly** - Follow REST conventions
9. **Monitor errors** - Set up error tracking and alerting
10. **Test error scenarios** - Write tests for error cases

---

## Error Response Builder

Utility class for building error responses:

```java
@Builder
@Data
public class ErrorResponse {
    private String error;
    private int status;
    private LocalDateTime timestamp;
    private String path;
    private Map<String, String> errors; // For validation errors
}
```

---

## Troubleshooting Common Errors

### Database Connection Error

**Error**: `Communications link failure`

**Solution**:
1. Check MySQL is running
2. Verify database exists
3. Check credentials in `application.properties`
4. Verify port 3306 is accessible

### JWT Validation Failed

**Error**: `Invalid JWT signature`

**Solution**:
1. Ensure JWT secret matches across all services
2. Check token hasn't expired
3. Verify token format is correct

### Service Not Found (Eureka)

**Error**: `No instances available for service-name`

**Solution**:
1. Check service is registered in Eureka (http://localhost:8761)
2. Verify `eureka.client.service-url.defaultZone` is correct
3. Wait for service registration (may take 30 seconds)

---

## Summary

Effective error handling ensures:
- **Better user experience** - Clear, actionable error messages
- **Easier debugging** - Comprehensive logging and error tracking
- **System reliability** - Graceful degradation when errors occur
- **Security** - No sensitive information leaked in errors
