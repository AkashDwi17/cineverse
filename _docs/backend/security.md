---
title: "Security Guide"
permalink: /docs/backend/security/
excerpt: "Security implementation details for Cineverse platform"
last_modified_at: 2026-01-18
toc: true
---

# Security Guide

This document covers all security implementations in the Cineverse platform, including authentication, authorization, password hashing, and best practices.

## Security Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  - Stores JWT token in localStorage                     │
│  - Sends token in Authorization header                  │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              API Gateway (Port 9191)                     │
│  - CORS configuration                                    │
│  - Routes requests to services                          │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│            Microservices (Auth, Movie, etc.)            │
│  - JWT token validation                                 │
│  - Role-based access control                            │
│  - SecurityFilterChain                                  │
└─────────────────────────────────────────────────────────┘
```

---

## JWT Authentication

### Overview

Cineverse uses **JWT (JSON Web Tokens)** for stateless authentication. Tokens are issued by the Auth Service and validated by all other services.

### JWT Token Structure

```
Header.Payload.Signature
```

**Header**:
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Payload**:
```json
{
  "sub": "john.doe@example.com",
  "userId": 1,
  "authorities": ["USER"],
  "iat": 1705536000,
  "exp": 1705622400
}
```

**Signature**: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)

---

### JWT Generation (Auth Service)

**File**: `auth-service/src/main/java/com/dac/auth_service/services/JwtService.java`

```java
@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String secret;
    
    public String generateToken(User user) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        
        return Jwts.builder()
            .subject(user.getUsername())
            .claim("userId", user.getId())
            .claim("authorities", List.of(user.getRole().name()))
            .issuedAt(new Date())
            .expiration(new Date(System.currentTimeMillis() + 86400000)) // 24 hours
            .signWith(key)
            .compact();
    }
}
```

**Key Points**:
- Token expires in 24 hours
- Contains user ID and role in claims
- Signed with HS256 algorithm
- Uses shared secret across all services

---

### JWT Validation

All services validate JWT tokens using Spring Security's OAuth2 Resource Server:

**File**: `SecurityConfig.java` (in each service)

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(
        HttpSecurity http,
        @Value("${jwt.secret}") String secret
    ) throws Exception {
        
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/login", "/api/auth/signup").permitAll()
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated()
            )
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )
            .oauth2ResourceServer(oauth -> oauth
                .jwt(jwt -> jwt.decoder(jwtDecoder(secret)))
            );
        
        return http.build();
    }
    
    @Bean
    public JwtDecoder jwtDecoder(@Value("${jwt.secret}") String secret) {
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes());
        return NimbusJwtDecoder.withSecretKey(key).build();
    }
}
```

---

## Password Security

### BCrypt Hashing

Passwords are hashed using **BCrypt** with a strength of 10 rounds (default).

**Implementation**:

```java
@Bean
public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
}

// During signup
String hashedPassword = passwordEncoder.encode(plainPassword);
user.setPassword(hashedPassword);

// During login
boolean matches = passwordEncoder.matches(plainPassword, user.getPassword());
```

**BCrypt Properties**:
- **Salt**: Automatically generated and stored with hash
- **Rounds**: 10 (2^10 = 1024 iterations)
- **Output**: 60-character string

**Example Hash**:
```
$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy
```

---

## Role-Based Access Control (RBAC)

### User Roles

| Role | Access Level | Capabilities |
|------|--------------|--------------|
| **USER** | Standard user | View movies, book tickets, manage own bookings |
| **ADMIN** | Administrator | Manage movies, theatres, shows, view all bookings |
| **SUPER_ADMIN** | Super admin | Full access including user management |

### Role Enum

**File**: `auth-service/src/main/java/com/dac/auth_service/entity/Role.java`

```java
public enum Role {
    USER,
    ADMIN,
    SUPER_ADMIN
}
```

---

### Endpoint Protection

#### Public Endpoints (No Authentication)

```java
.requestMatchers("/api/auth/login", "/api/auth/signup").permitAll()
.requestMatchers("/api/movies", "/api/movies/**").permitAll()
.requestMatchers("/api/theatres/list", "/api/theatres/view/**").permitAll()
.requestMatchers("/api/shows/**").permitAll()
```

#### Protected Endpoints (Authentication Required)

```java
.anyRequest().authenticated()
```

#### Admin-Only Endpoints

Enforced at service layer or controller level:

```java
// Example: Creating a movie (Admin only)
@PostMapping
public ResponseEntity<MovieResponse> create(
    @RequestHeader("Authorization") String authHeader,
    @RequestBody MovieRequest request
) {
    // Service validates admin role from JWT token
    return ResponseEntity.ok(service.create(request));
}
```

---

## CORS Configuration

### API Gateway CORS

**File**: `api-gateway/src/main/resources/application.properties`

```properties
# Allow frontend origin
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedOrigins=http://localhost:5173

# Allow all HTTP methods
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedMethods=*

# Allow all headers
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedHeaders=*

# Allow credentials (cookies, authorization headers)
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowCredentials=true

# Add CORS to simple URL handler
spring.cloud.gateway.globalcors.add-to-simple-url-handler-mapping=true
```

### Production CORS

For production, restrict origins:

```properties
spring.cloud.gateway.globalcors.cors-configurations.[/**].allowedOrigins=https://cineverse.com,https://www.cineverse.com
```

---

## Frontend Security

### Token Storage

**File**: `frontend/src/apiClient.js`

```javascript
// Store token after login
localStorage.setItem('cineverse_token', token);
localStorage.setItem('cineverse_role', role);
localStorage.setItem('cineverse_userId', userId);

// Retrieve token for API calls
const token = localStorage.getItem('cineverse_token');
```

### Axios Interceptor

```javascript
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cineverse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Protected Routes

```javascript
function AdminRoute({ children }) {
  const token = localStorage.getItem("cineverse_token");
  const role = localStorage.getItem("cineverse_role");

  if (!token) return <Navigate to="/login" replace />;

  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
```

---

## Security Best Practices

### 1. JWT Secret Management

**Development**:
```properties
jwt.secret=Lvnu9OxA/Z1tvC+jXnbo9gcpSFI8BU8pPlgIeC/UyCg=
```

**Production** (use environment variables):
```bash
export JWT_SECRET=$(openssl rand -base64 32)
```

```properties
jwt.secret=${JWT_SECRET}
```

### 2. Token Expiration

Set appropriate expiration times:

```java
// Short-lived tokens (1 hour)
.expiration(new Date(System.currentTimeMillis() + 3600000))

// Medium-lived tokens (24 hours) - Current
.expiration(new Date(System.currentTimeMillis() + 86400000))

// Long-lived tokens (7 days)
.expiration(new Date(System.currentTimeMillis() + 604800000))
```

### 3. HTTPS in Production

Always use HTTPS in production:

```properties
server.ssl.enabled=true
server.ssl.key-store=classpath:keystore.p12
server.ssl.key-store-password=${SSL_PASSWORD}
server.ssl.key-store-type=PKCS12
```

### 4. Password Requirements

Enforce strong passwords at application level:

```java
public boolean isStrongPassword(String password) {
    return password.length() >= 8 &&
           password.matches(".*[A-Z].*") &&  // Uppercase
           password.matches(".*[a-z].*") &&  // Lowercase
           password.matches(".*\\d.*");      // Digit
}
```

### 5. Rate Limiting

Implement rate limiting to prevent brute force attacks:

```java
// Example using Bucket4j
@RateLimiter(name = "login", fallbackMethod = "loginFallback")
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // Login logic
}
```

### 6. Input Validation

Always validate and sanitize user input:

```java
@Valid @RequestBody SignupRequest request
```

```java
public record SignupRequest(
    @NotBlank @Email String username,
    @NotBlank @Size(min = 8) String password,
    @Pattern(regexp = "^\\+?[1-9]\\d{1,14}$") String phone
) {}
```

### 7. SQL Injection Prevention

Use parameterized queries (JPA does this automatically):

```java
// Safe - JPA uses parameterized queries
@Query("SELECT u FROM User u WHERE u.username = :username")
Optional<User> findByUsername(@Param("username") String username);
```

### 8. XSS Prevention

Frontend should sanitize user-generated content:

```javascript
import DOMPurify from 'dompurify';

const clean = DOMPurify.sanitize(userInput);
```

---

## Security Checklist

- [ ] JWT secret is strong and environment-specific
- [ ] Passwords are hashed with BCrypt
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] Sensitive data not logged
- [ ] Database credentials in environment variables
- [ ] Token expiration set appropriately
- [ ] Admin endpoints properly protected
- [ ] SQL injection prevention (parameterized queries)
- [ ] XSS prevention on frontend
- [ ] CSRF protection (not needed for stateless JWT)
- [ ] Regular security audits
- [ ] Dependency vulnerability scanning

---

## Common Security Issues

### Issue 1: Token Exposed in URL

**Bad**:
```
GET /api/movies?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Good**:
```
GET /api/movies
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Issue 2: Storing Sensitive Data in JWT

**Bad**:
```json
{
  "sub": "user@example.com",
  "password": "secret123",
  "creditCard": "1234-5678-9012-3456"
}
```

**Good**:
```json
{
  "sub": "user@example.com",
  "userId": 1,
  "authorities": ["USER"]
}
```

### Issue 3: Not Validating Token Expiration

Always check token expiration on the backend. Spring Security does this automatically.

---

## Security Monitoring

### Logging Security Events

```java
@Slf4j
@RestController
public class AuthController {
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        log.info("Login attempt for user: {}", request.username());
        
        // Login logic
        
        if (success) {
            log.info("Successful login for user: {}", request.username());
        } else {
            log.warn("Failed login attempt for user: {}", request.username());
        }
    }
}
```

### Failed Login Tracking

Implement account lockout after multiple failed attempts:

```java
private Map<String, Integer> failedAttempts = new ConcurrentHashMap<>();

public void recordFailedLogin(String username) {
    int attempts = failedAttempts.getOrDefault(username, 0) + 1;
    failedAttempts.put(username, attempts);
    
    if (attempts >= 5) {
        // Lock account or implement delay
        throw new AccountLockedException("Too many failed attempts");
    }
}
```

---

## Penetration Testing

Regular security testing should include:

1. **Authentication bypass attempts**
2. **SQL injection testing**
3. **XSS vulnerability scanning**
4. **CSRF testing** (though not applicable for stateless JWT)
5. **Authorization bypass attempts**
6. **Token manipulation testing**
7. **Brute force attack simulation**

---

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)
- [Spring Security Documentation](https://spring.io/projects/spring-security)
- [BCrypt Calculator](https://bcrypt-generator.com/)
