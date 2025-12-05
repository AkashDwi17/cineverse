---
title: "Introduction"
permalink: /docs/introduction/
excerpt: "Introduction to Online Voting System"
last_modified_at: 2025-11-15
toc: true
---

# 🎬 Cineverse - BookMyShow Microservices Platform

> **A Comprehensive Online Movie Booking & Ticket Management System**  
> Built with modern microservices architecture, implementing Spring Boot, MySQL, MongoDB, and Eureka service discovery. 

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Services Overview](#services-overview)
- [Database Architecture](#database-architecture)
- [Installation & Setup](#installation--setup)
- [Quick Start Guide](#quick-start-guide)
- [API Gateway Routes](#api-gateway-routes)
- [Development](#development)
- [Team](#team)

---

## 🎯 Overview

**Cineverse** is an enterprise-grade, scalable movie booking platform inspired by BookMyShow.  It leverages a distributed microservices architecture to handle complex operations like:

- User authentication and authorization
- Movie catalog management
- Theatre and screen information
- Show scheduling and pricing
- Real-time seat booking and locking
- Ticket generation and WhatsApp notifications
- Service discovery and dynamic routing

The system ensures **reliability**, **scalability**, and **maintainability** through service isolation and independent deployment capabilities.

---

## ✨ Key Features

### 🎫 For Users (Customers)
- ✅ **Secure Registration & Authentication** - JWT-based authentication with role-based access
- ✅ **Movie Discovery** - Browse movies by language, genre, release date
- ✅ **Show Listings** - Filter shows by theatre, date, and time
- ✅ **Smart Seat Selection** - Real-time seat availability with temporary locking
- ✅ **Seamless Booking** - Complete booking workflow with payment simulation
- ✅ **Instant Notifications** - WhatsApp ticket delivery with booking details
- ✅ **Booking History** - Track and manage all bookings

### 🔐 For Administrators
- ✅ **Movie Management** - Add, update, delete movie metadata
- ✅ **Theatre Management** - Manage theatres, screens, and seat configurations
- ✅ **Show Scheduling** - Create shows with pricing and timings
- ✅ **Booking Oversight** - Monitor and manage customer bookings
- ✅ **Analytics Dashboard** - Real-time booking statistics and reports

### 🛡️ Security Features
- 🔒 **Password Encryption** - BCrypt hashing for secure password storage
- 🔒 **JWT Token Authentication** - Stateless, secure API authentication
- 🔒 **Role-Based Access Control** - USER and ADMIN role separation
- 🔒 **Seat Lock Mechanism** - Prevents double-booking with TTL-based locks
- 🔒 **Data Validation** - Comprehensive input validation across services

---

## 💻 Technology Stack

### Backend Services
| Component | Technology |
|-----------|-----------|
| **Framework** | Spring Boot 3.x |
| **Security** | Spring Security + JWT |
| **Service Discovery** | Netflix Eureka |
| **API Gateway** | Spring Cloud Gateway |
| **Database (SQL)** | MySQL 8.0+ |
| **Database (NoSQL)** | MongoDB |
| **ORM** | Spring Data JPA |
| **Build Tool** | Maven |
| **Language** | Java 21 |

### Frontend
| Component | Technology |
|-----------|-----------|
| **Framework** | React. js |
| **Styling** | CSS3, Responsive Design |
| **Language** | JavaScript (ES6+) |
| **Package Manager** | npm |
| **Development Server** | Vite |

### DevOps & Tools
- **Version Control** - Git & GitHub
- **API Testing** - Postman
- **Development IDEs** - IntelliJ IDEA, VS Code
- **Container Ready** - Docker compatible

---

## 🏗️ System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        CINEVERSE PLATFORM                       │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│                      FRONTEND LAYER (React.js)                   │
│  User Interface | Show Listings | Seat Selection | Bookings      │
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

### Service Interactions

```
User Request
    ↓
API Gateway (9191)
    ↓
Route to Microservice
    ↓
Service Logic (Validate, Process)
    ↓
Database/External Service
    ↓
Response to Client
```

---

## 📁 Project Structure

```
cineverse/
├── _docs/
│   ├── backend/
│   │   ├── api-gateway-eureka.md      # Gateway and Eureka config
│   │   ├── auth-service.md            # Authentication endpoints
│   │   ├── booking-service.md         # Booking API details
│   │   ├── movie-service.md           # Movie management
│   │   ├── notification-service.md    # WhatsApp notifications
│   │   ├── show-service.md            # Show scheduling
│   │   └── theatre-service.md         # Theatre management
│   │
│   ├── database/
│   │   ├── auth-database.md           # Auth DB schema (MySQL)
│   │   ├── booking-database.md        # Booking DB schema (MySQL)
│   │   ├── movie-database.md          # Movie DB schema (MongoDB)
│   │   ├── show-database.md           # Show DB schema (MySQL)
│   │   └── theatre-database.md        # Theatre DB schema (MySQL)
│   │
│   ├── frontend/
│   │   ├── ui-components.md           # React components
│   │   ├── feedback.md                # Feedback system
│   │   └── usereffectvoting.md        # User interaction effects
│   │
│   ├── diagram. md                     # System architecture diagrams
│   ├── installation.md                # Setup instructions
│   ├── introduction.md                # Project overview
│   ├── quick-start.md                 # Quick start guide
│   └── README.md                      # Documentation index
│
├── frontend/                          # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ... 
│
├── backend/                           # Spring Boot microservices
│   ├── api-gateway/
│   ├── auth-service/
│   ├── theatre-service/
│   ├── movie-service/
│   ├── show-service/
│   ├── booking-service/
│   ├── notification-service/
│   ├── eureka-server/
│   └── ...
│
├── README.md                          # Main README
├── LICENSE                            # Apache 2.0 License
└── ... 
```

---

## 🔧 Services Overview

### 1️⃣ **Auth Service** (Port: 8081)
**Purpose**: User authentication and JWT token generation

**Responsibilities**:
- User registration (signup)
- User login with credentials
- JWT token generation with role claims
- Password hashing and validation

**Key Endpoints**:
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Authenticate and get JWT token
- `GET /api/auth/validate` - Validate JWT token

**Database**: MySQL (`bookmyshow_auth. users`)

---

### 2️⃣ **Theatre Service** (Port: 8082)
**Purpose**: Manage theatres, screens, and seat information

**Responsibilities**:
- CRUD operations for theatres
- Store screen types (2D, 3D, IMAX)
- Manage seat capacities

**Key Endpoints**:
- `GET /api/theatres/list` - List all theatres
- `GET /api/theatres/view/{id}` - Get theatre details
- `POST /api/theatres` - Create new theatre (ADMIN)

**Database**: MySQL (`bookmyshow_theatre.theatres`)

---

### 3️⃣ **Movie Service** (Port: 8083)
**Purpose**: Movie catalog and metadata management

**Responsibilities**:
- CRUD operations for movies
- Store movie metadata (title, genre, language, duration, cast)
- Provide movie listings

**Key Endpoints**:
- `GET /api/movies/list` - List all movies
- `GET /api/movies/view/{id}` - Get movie details
- `POST /api/movies` - Add new movie (ADMIN)

**Database**: MongoDB (`movie_db.movies`)

---

### 4️⃣ **Show Service** (Port: 8084)
**Purpose**: Map movies to theatres with date, time, and pricing

**Responsibilities**:
- Create/update show schedules
- Provide shows by movie or theatre
- Manage show pricing and timings

**Key Endpoints**:
- `GET /api/shows/by-movie/{movieId}` - Shows for a movie
- `GET /api/shows/by-theatre/{theatreId}` - Shows for a theatre
- `POST /api/shows` - Create new show (ADMIN)

**Database**: MySQL (`show_db.shows`)

**Dependencies**: Movie Service, Theatre Service

---

### 5️⃣ **Booking Service** (Port: 8085)
**Purpose**: Complete booking lifecycle management

**Responsibilities**:
- Lock seats temporarily during booking
- Confirm bookings after payment
- Cancel bookings and release seats
- Maintain booking history

**Key Endpoints**:
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/{id}` - Get booking details
- `PUT /api/bookings/{id}/confirm` - Confirm booking
- `DELETE /api/bookings/{id}` - Cancel booking

**Database**: MySQL (`booking_db.bookings`, `booking_db.seat_locks`)

**Seat Locking Mechanism**:
- Seats locked when user starts selection
- Lock expires after TTL (prevents double-booking)
- Lock removed when booking confirmed or cancelled

**Dependencies**: Show Service, Auth Service, Notification Service

---

### 6️⃣ **Notification Service** (Port: 8086)
**Purpose**: Send booking tickets via WhatsApp

**Responsibilities**:
- Accept booking details and send WhatsApp messages
- Format ticket information
- Integrate with WhatsApp API or simulate sending

**Key Endpoints**:
- `POST /api/notify/send-ticket` - Send booking ticket

**Payload**:
```json
{
  "phone": "+91XXXXXXXX",
  "bookingId": 55,
  "movie": "Avengers",
  "theatre": "PVR Bellandur",
  "showTime": "6:30 PM",
  "seats": ["A1", "A2"]
}
```

**Dependencies**: None (called by Booking Service)

---

### 🔄 **Eureka Service Registry** (Port: 8761)
**Purpose**: Service discovery and registration

**Features**:
- Auto-registration of all microservices
- Health check monitoring
- Service instance lookup
- Load balancing support

---

### 🚪 **API Gateway** (Port: 9191)
**Purpose**: Unified entry point for all frontend requests

**Routing Rules**:
| Route | Service |
|-------|---------|
| `/api/auth/**` | Auth Service (8081) |
| `/api/theatres/**` | Theatre Service (8082) |
| `/api/movies/**` | Movie Service (8083) |
| `/api/shows/**` | Show Service (8084) |
| `/api/bookings/**` | Booking Service (8085) |
| `/api/notify/**` | Notification Service (8086) |

**Features**:
- Request routing
- Load balancing
- Request filtering
- Response transformation

---

## 🗄️ Database Architecture

### SQL Databases (MySQL)

#### 1. **Auth Database** (`bookmyshow_auth`)
```sql
-- users table
CREATE TABLE users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL (hashed),
  phone VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  role ENUM('USER', 'ADMIN', 'SUPER_ADMIN')
);
```

#### 2. **Theatre Database** (`bookmyshow_theatre`)
```sql
-- theatres table
CREATE TABLE theatres (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  screen_type ENUM('TWO_D', 'THREE_D', 'IMAX'),
  total_seats INT
);
```

#### 3.  **Show Database** (`show_db`)
```sql
-- shows table
CREATE TABLE shows (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  movie_id VARCHAR(255), -- MongoDB ObjectId as string
  theatre_id BIGINT,
  show_date VARCHAR(255),
  show_time VARCHAR(255),
  price DOUBLE
);
```

#### 4.  **Booking Database** (`booking_db`)
```sql
-- bookings table
CREATE TABLE bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  show_id BIGINT,
  user_id BIGINT,
  theatre_id BIGINT,
  movie_id VARCHAR(255),
  seats VARCHAR(255), -- Comma-separated seat numbers
  amount DOUBLE,
  booking_time DATETIME(6),
  status ENUM('PENDING', 'CONFIRMED', 'CANCELLED')
);

-- seat_locks table (for temporary seat locking)
CREATE TABLE seat_locks (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  show_id BIGINT,
  user_id BIGINT,
  seat_number VARCHAR(255),
  created_at DATETIME(6),
  expires_at DATETIME(6)
);
```

### NoSQL Database (MongoDB)

#### **Movie Database** (`movie_db`)
```json
{
  "_id": "69246514c412948190c5fb80",
  "title": "Avengers",
  "genre": "Action",
  "language": "English",
  "durationMinutes": 180,
  "rating": 9.2,
  "releaseDate": "2019-04-26",
  "posterUrl": "https://.. .",
  "cast": ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
  "_class": "com. dac.movieService.model.Movie"
}
```

---

## ⚙️ Installation & Setup

### Prerequisites

Ensure you have the following installed:

- **Java 21** - JDK for backend services
- **Node.js (v18+)** - For frontend
- **MySQL 8.0+** - Relational database
- **MongoDB** - NoSQL database for movies
- **Git** - Version control
- **Maven** - Build tool for Java projects
- **npm** - Package manager for Node.js

### Step 1: Clone Repository

```bash
git clone https://github.com/AkashDwi17/cineverse. git
cd cineverse
```

### Step 2: Database Setup

#### MySQL Databases

```bash
# Open MySQL client
mysql -u root -p

# Create databases
CREATE DATABASE bookmyshow_auth;
CREATE DATABASE bookmyshow_theatre;
CREATE DATABASE show_db;
CREATE DATABASE booking_db;

# Import schema files (if provided)
# use bookmyshow_auth;
# source path/to/auth-schema.sql;
# ...  repeat for other databases
```

#### MongoDB

```bash
# Start MongoDB service
# Then create movie_db database
mongosh
use movie_db
```

### Step 3: Backend Setup

#### Configure Database Credentials

Update `backend/application.properties` for each service:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/database_name
spring.datasource. username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA Configuration
spring.jpa. hibernate.ddl-auto=update
spring.jpa.show-sql=false
spring.jpa.properties. hibernate.dialect=org.hibernate. dialect.MySQL8Dialect

# For MongoDB (Movie Service)
spring.data.mongodb.uri=mongodb://localhost:27017/movie_db
```

#### Build and Run Services

```bash
# 1. Start Eureka Server
cd backend/eureka-server
./mvnw spring-boot:run

# 2. Start API Gateway
cd backend/api-gateway
./mvnw spring-boot:run

# 3. Start Auth Service
cd backend/auth-service
./mvnw spring-boot:run

# 4.  Start Theatre Service
cd backend/theatre-service
./mvnw spring-boot:run

# 5. Start Movie Service
cd backend/movie-service
./mvnw spring-boot:run

# 6. Start Show Service
cd backend/show-service
./mvnw spring-boot:run

# 7. Start Booking Service
cd backend/booking-service
./mvnw spring-boot:run

# 8. Start Notification Service
cd backend/notification-service
./mvnw spring-boot:run
```

Or use Maven wrapper:
```bash
# Linux/Mac
./mvnw spring-boot:run

# Windows
mvnw. cmd spring-boot:run
```

### Step 4: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at: `http://localhost:5173`

---

## 🚀 Quick Start Guide

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API Gateway**: http://localhost:9191
- **Eureka Dashboard**: http://localhost:8761

### Default Accounts

| Role | Username | Password |
|------|----------|----------|
| Admin | admin@cineverse. com | admin@123 |
| User | user@cineverse.com | user@123 |

### Sample Workflow

#### 1. Admin: Add Theatre

```bash
POST http://localhost:9191/api/theatres
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}

{
  "name": "PVR Bellandur",
  "address": "Bellandur, Bangalore",
  "city": "Bangalore",
  "screenType": "TWO_D",
  "totalSeats": 250
}
```

#### 2. Admin: Add Movie

```bash
POST http://localhost:9191/api/movies
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}

{
  "title": "Avengers",
  "description": "Superhero movie",
  "language": "English",
  "genre": "Action",
  "releaseDate": "2025-11-15",
  "duration": 180
}
```

#### 3. Admin: Create Show

```bash
POST http://localhost:9191/api/shows
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}

{
  "movieId": "69246514c412948190c5fb80",
  "theatreId": 1,
  "showDate": "2025-11-25",
  "showTime": "18:30",
  "price": 200
}
```

#### 4. User: Book Tickets

```bash
POST http://localhost:9191/api/bookings
Content-Type: application/json
Authorization: Bearer {JWT_TOKEN}

{
  "showId": 5,
  "userId": 20,
  "seats": ["A1", "A2"]
}
```

#### 5. User Receives Notification

- WhatsApp message sent with booking details
- Includes movie name, theatre, time, and seat numbers

---

## 👨‍💻 Development

### Project Structure Best Practices

```
src/main/
├── java/
│   └── com/cineverse/
│       ├── model/        # Entity classes
│       ├── dto/          # Data Transfer Objects
│       ├── controller/   # REST endpoints
│       ├── service/      # Business logic
│       ├── repository/   # Database access
│       ├── exception/    # Custom exceptions
│       └── config/       # Application configuration
│
└── resources/
    ├── application.properties  # Configuration
    ├── application-dev.properties
    └── application-prod.properties
```

### Code Conventions

- **Naming**: camelCase for variables/methods, PascalCase for classes
- **Comments**: Clear, concise, document complex logic
- **Error Handling**: Custom exceptions with meaningful messages
- **Testing**: Unit tests for services, integration tests for endpoints

### Running Tests

```bash
# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=ServiceTest

# Run with coverage
mvn test jacoco:report
```

### Building for Production

```bash
# Build JAR files
mvn clean package

# Run JAR
java -jar target/service-name-1.0.0.jar
```

---

## 📊 Monitoring & Troubleshooting

### Eureka Dashboard
Visit: http://localhost:8761

Shows:
- All registered services
- Service instances
- Health status
- Last heartbeat

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port already in use | Change port in `application.properties` or kill process |
| Database connection failed | Verify credentials and database existence |
| Service not registering in Eureka | Check Eureka URL in service config |
| CORS errors | Configure CORS in API Gateway |
| JWT token expired | Request new token from Auth Service |

### Logs

```bash
# View logs for specific service
tail -f logs/service-name.log

# Enable debug logging (in application.properties)
logging.level. root=DEBUG
logging.level.com.cineverse=DEBUG
```

---

## 🔐 Security Considerations

1. **Never commit credentials** - Use environment variables
2. **JWT Expiration** - Set appropriate token expiration times
3. **Password Hashing** - Always use BCrypt for passwords
4. **Database Backups** - Regular backups of all databases
5. **API Rate Limiting** - Implement rate limiting in gateway
6. **Input Validation** - Sanitize all user inputs
7. **HTTPS** - Use HTTPS in production
8. **Secrets Management** - Use Spring Vault or similar tools

---

## 📈 Performance Optimization

- **Caching**: Implement Redis for frequently accessed data
- **Database Indexing**: Create indexes on frequently queried columns
- **Pagination**: Implement pagination for large data sets
- **Async Processing**: Use async for notification sending
- **Load Balancing**: Distribute load across service instances
- **Connection Pooling**: Use HikariCP for database connections

---

## 🧪 Testing

### Unit Tests
```java
@SpringBootTest
public class BookingServiceTest {
    @MockBean
    private BookingRepository bookingRepository;
    
    @InjectMocks
    private BookingService bookingService;
    
    @Test
    public void testCreateBooking() {
        // Test implementation
    }
}
```

### Integration Tests
```java
@SpringBootTest(webEnvironment = SpringBootTest. WebEnvironment.RANDOM_PORT)
public class BookingControllerIntegrationTest {
    @LocalServerPort
    private int port;
    
    @Test
    public void testBookingEndpoint() {
        // Test implementation
    }
}
```

---

## 📝 API Documentation

Each service exposes Swagger/OpenAPI documentation:

- **Auth Service**: http://localhost:8081/swagger-ui.html
- **Theatre Service**: http://localhost:8082/swagger-ui.html
- **Movie Service**: http://localhost:8083/swagger-ui.html
- **Show Service**: http://localhost:8084/swagger-ui.html
- **Booking Service**: http://localhost:8085/swagger-ui.html
- **Notification Service**: http://localhost:8086/swagger-ui.html

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Review Checklist
- [ ] Code follows project conventions
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No breaking changes
- [ ] All tests passing

---

## 📄 License

This project is licensed under the **Apache License 2.0** - see the [LICENSE](LICENSE) file for details. 

---

## 👥 Team

| Sr. No | Name | GitHub |
|--------|------|--------|
| 01 | Aaman Javaed Sayyad | [@Aamanjs](https://github.com/Aamanjs) |
| 02 | Avadhut Ravindra Joshi | [@AvadhutJoshi012](https://github.com/AvadhutJoshi012) |
| 03 | Deepak Sanjay Revgade | [@deepakrevgade](https://github.com/deepakrevgade) |
| 04 | Rishikesh Sukhadev More | [@rushimore17](https://github.com/rushimore17) |
| 05 | Yadnyesh Rajesh Kolte | [@yadnyeshkolte](https://github.com/yadnyeshkolte) |

---

## 📞 Support & Contact

For issues, questions, or suggestions:

1. Check existing GitHub issues
2. Create a new GitHub issue with detailed description
3. Contact team members on GitHub

---

## 🎓 Learning Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Cloud Documentation](https://spring.io/projects/spring-cloud)
- [React Documentation](https://react.dev)
- [MongoDB Documentation](https://docs.mongodb. com)
- [JWT Authentication](https://jwt.io)

---

## 🗺️ Project Roadmap

### Phase 1 (Current) ✅
- Core microservices
- Basic booking functionality
- User authentication

### Phase 2 (Planned)
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Mobile app

### Phase 3 (Future)
- [ ] Multi-language support
- [ ] Recommendation engine
- [ ] Social features
- [ ] Admin portal enhancement

---

## ⭐ Show Your Support

If you found this project helpful, please give it a star!  ⭐

---

**Last Updated**: 2025-12-05  
**Version**: 1.0.0  
**Status**: Active Development
