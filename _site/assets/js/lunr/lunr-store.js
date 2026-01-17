var store = [{
        "title": "API Gateway & Eureka Server",
        "excerpt":"7 api-gateway-eureka.md API Gateway &amp; Eureka This document covers the API Gateway (router) and the Eureka service registry. 1 API Gateway Gateway Port: 9191 (frontend should use this port) Routes (example) /api/auth/** → auth-service /api/theatres/** → theatre-service /api/movies/** → movie-service /api/shows/** → show-service /api/bookings/** → booking-service /api/notify/** → notification-service Example...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/api-gateway-eureka/",
        "teaser": null
      },{
        "title": "Auth Service",
        "excerpt":"Auth Service Purpose: Manage user registration, login and JWT issuance used across other microservices. Typical Port: 8081 (example — change to whatever your app uses) Responsibilities Register new users (signup) Authenticate users (login) Generate JWT tokens with role claims (USER / ADMIN) Password hashing and basic validation Data model id:...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/auth-service/",
        "teaser": null
      },{
        "title": "Booking Service",
        "excerpt":"5 booking-service.md Booking Service Port (example): 8085 Responsibilities Lock seats for a pending booking (short TTL) Confirm bookings (payment simulated/actual) Cancel bookings and release seats Provide booking history/details Data model bookingId (Long) showId (Long) userId (Long) selectedSeats (List) status (PENDING CONFIRMED CANCELLED) Dependencies Show Service (to validate show &amp; available...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/booking-service/",
        "teaser": null
      },{
        "title": "Movie Service",
        "excerpt":"Movie Service Port (example): 8083 Responsibilities CRUD operations for movies Expose movie listings and details used by show service Data model id (Long) title (String) description (String) language (String) genre (String) releaseDate (Date) duration (Integer) APIs GET /api/movies/list List movies. GET /api/movies/view/{id} Get a single movie. POST /api/movies (ADMIN) {...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/movie-service/",
        "teaser": null
      },{
        "title": "Notification Service",
        "excerpt":"Notification Service (WhatsApp Ticket) Port (example): 8086 Responsibilities Accept a ticket payload and send a WhatsApp message (via Meta/WhatsApp API or simulated) Provide a send-ticket endpoint used by Booking Service Data model (for message) phone (String) bookingId (Long) movie (String) theatre (String) showTime (String) seats (List) API POST /api/notify/send-ticket {...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/notification-service/",
        "teaser": null
      },{
        "title": "Show Service",
        "excerpt":"Show Service Port (example): 8084 Responsibilities Create/update/delete show records Provide show listings by movie or theatre Data model id (Long) movieId (Long) theatreId (Long) showDate (YYYY-MM-DD) showTime (HH:mm) price (Integer) Dependencies Movie Service (validate movieId) Theatre Service (validate theatreId) Auth Service (role checks) APIs GET /api/shows/by-movie/{movieId} List shows for a...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/show-service/",
        "teaser": null
      },{
        "title": "Theatre Service",
        "excerpt":"Theatre Service Port (example): 8082 Responsibilities Store theatre records (name, address, city, screen type, seat counts) Allow listing and retrieval of theatre details Admin operations: create, update, delete theatres Data fields id (Long) name (String) address (String) city (String) screenType (TWO_D THREE_D IMAX) totalSeats (int) APIs GET /api/theatres/list List all...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/backend/theatre-service/",
        "teaser": null
      },{
        "title": "Auth Service Database",
        "excerpt":"Auth Service Database (MySQL) Database Name: bookmyshow_auth Table: users This table stores all registered users for the BookMyShow system. 📌 Table: users Field Type Null Key Description id bigint NO PRI Auto-increment primary key city varchar(255) YES   User’s city password varchar(255) NO   Encrypted password phone varchar(255) YES  ...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/database/auth-database/",
        "teaser": null
      },{
        "title": "Booking Service Database",
        "excerpt":"Booking Service Database (MySQL) Database Name: booking_db Tables: bookings, seat_locks 📌 Table: bookings Field Type Null Description id bigint NO Booking ID (PK) amount double YES Total ticket price booking_time datetime(6) YES When the booking was created movie_id varchar(255) YES Movie ID (MongoDB string) seats varchar(255) YES Comma-separated seat numbers...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/database/booking-database/",
        "teaser": null
      },{
        "title": "Movie Service Database (MongoDB)",
        "excerpt":"Movie Service Database (MongoDB)   Database: movie_db  Collection: movies   Movies are stored as JSON documents.     📌 Example Movie Document   {   \"_id\": \"69246514c412948190c5fb80\",   \"title\": \"Avenger\",   \"genre\": \"Action\",   \"language\": \"English\",   \"durationMinutes\": 180,   \"rating\": 9.2,   \"releaseDate\": \"2019-04-26\",   \"posterUrl\": \"https://res.cloudinary.com/dhwoy4zgp/image/upload/v1763992851/qprqczak...\",   \"cast\": [     \"Robert Downey Jr.\",     \"Chris Evans\",     \"Scarlett Johansson\"   ],   \"_class\": \"com.dac.movieService.model.Movie\" }  ","categories": [],
        "tags": [],
        "url": "/cineverse/docs/database/movie-database/",
        "teaser": null
      },{
        "title": "Show Service Database",
        "excerpt":"Show Service Database (MySQL) Database Name: show_db Table: shows 📌 Table: shows Field Type Null Key Description id bigint NO PRI Auto-increment primary key movie_id varchar(255) YES   ID of movie (stored in MongoDB as string) price double YES   Ticket price show_date varchar(255) YES   Date of show (e.g.,...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/database/show-database/",
        "teaser": null
      },{
        "title": "Theatre Service Database",
        "excerpt":"Theatre Service Database (MySQL) Database Name: bookmyshow_theatre Table: theatres 📌 Table: theatres Field Type Null Key Description id bigint NO PRI Auto-increment primary key address varchar(255) YES   Theatre address city varchar(255) YES   City location name varchar(255) YES   Theatre name screen_type enum(‘IMAX’,’THREE_D’,’TWO_D’) YES   Screen format total_seats int...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/database/theatre-database/",
        "teaser": null
      },{
        "title": "Diagrams",
        "excerpt":"Level 0 DFD (Data Flow Diagram)      Level 1 DFD (Data Flow Diagram)      Deployment Diagram      Activity Diagram      System Diagrams      ","categories": [],
        "tags": [],
        "url": "/cineverse/docs/diagrams/",
        "teaser": null
      },{
        "title": "Feedback System",
        "excerpt":"Feedback System Overview The feedback system allows users to provide feedback about their movie booking experience and report issues. Feedback Types General Feedback: Overall booking experience Technical Issues: Bugs or errors during booking Feature Requests: Suggestions for improvement Usability: UI/UX feedback Feedback Component import React, { useState } from 'react';...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/frontend/feedback/",
        "teaser": null
      },{
        "title": "UI Components",
        "excerpt":"UI Components Component Library Cineverse uses a custom component library built with React. Core Components Button &lt;Button variant=\"primary\" size=\"large\" onClick={handleClick} &gt; Book Tickets &lt;/Button&gt; Card &lt;Card&gt; &lt;CardHeader&gt; &lt;h3&gt;Movie Title&lt;/h3&gt; &lt;/CardHeader&gt; &lt;CardBody&gt; &lt;p&gt;Movie description...&lt;/p&gt; &lt;/CardBody&gt; &lt;CardFooter&gt; &lt;Button&gt;View Shows&lt;/Button&gt; &lt;/CardFooter&gt; &lt;/Card&gt; Modal &lt;Modal isOpen={isOpen} onClose={handleClose}&gt; &lt;ModalHeader&gt;Confirm Booking&lt;/ModalHeader&gt; &lt;ModalBody&gt; Are you sure you...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/frontend/ui-components/",
        "teaser": null
      },{
        "title": "Booking Flow",
        "excerpt":"Booking Flow Overview The booking interface provides an intuitive and seamless way for users to book movie tickets. Booking Flow User logs in to the system Browses available movies Selects a movie Chooses theatre and show time Selects seats Confirms booking Receives WhatsApp ticket UI Components Movie List import React,...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/frontend/usereffectvoting/",
        "teaser": null
      },{
        "title": "Installation",
        "excerpt":"Installation Guide Follow these steps to set up the Online Voting System on your local machine. Prerequisites Ensure you have the following software installed: Java 21: Required for the backend. Node.js (v18+): Required for the frontend. MySQL: Required for the database. Git: To clone the repository. 1. Database Setup Open...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/installation/",
        "teaser": null
      },{
        "title": "Introduction",
        "excerpt":"🎬 Cineverse - BookMyShow Microservices Platform A Comprehensive Online Movie Booking &amp; Ticket Management System Built with modern microservices architecture, implementing Spring Boot, MySQL, MongoDB, and Eureka service discovery. 📋 Table of Contents Overview Key Features Technology Stack System Architecture Project Structure Services Overview Database Architecture Installation &amp; Setup Quick...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/introduction/",
        "teaser": null
      },{
        "title": "Quick Start",
        "excerpt":"Quick Start Guide This guide will help you verify the application flow by simulating a real-world voting scenario. Prerequisites Ensure you have completed the Installation Guide and both the Backend and Frontend servers are running. Frontend: http://localhost:5173 Backend: http://localhost:8080 Walkthrough 1. Admin: Create an Election Navigate to http://localhost:5173/login. Login with...","categories": [],
        "tags": [],
        "url": "/cineverse/docs/quick-start/",
        "teaser": null
      },]
