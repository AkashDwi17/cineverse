---
layout: splash
title: "Cineverse"
header:
  overlay_color: "#FFFFFF"
  overlay_filter: "0.85"
  overlay_image: /assets/images/header.png
  actions:
    - label: "Get Started"
      url: "/docs/introduction/"
    - label: "View on GitHub"
      url: "https://github.com/AkashDwi17/cineverse"
excerpt: "Complete documentation for the Cineverse"
feature_row:
  - image_path: /assets/images/database-icon.png
    alt: "Database"
    title: "Database"
    excerpt: "Learn about the database structure, schemas, and ER diagrams"
    url: "/docs/database/auth-database/"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/images/backend-icon.png
    alt: "Backend"
    title: "Backend"
    excerpt: "Explore the Spring Boot backend architecture and APIs"
    url: "/docs/backend/auth-service/"
    btn_label: "Read More"
    btn_class: "btn--primary"
  - image_path: /assets/images/frontend-icon.png
    alt: "Frontend"
    title: "Frontend"
    excerpt: "Discover the React frontend components and user experience"
    url: "/docs/frontend/usereffectvoting/"
    btn_label: "Read More"
    btn_class: "btn--primary"
---

{% include feature_row id="intro" type="center" %}

{% include feature_row %}

## Features

- **Secure Authentication**: JWT-based authentication with role-based access
- **Movie Discovery**: Browse movies by language, genre, and release date
- **Smart Seat Selection**: Real-time seat availability with temporary locking
- **Seamless Booking**: Complete booking workflow with instant confirmation
- **WhatsApp Notifications**: Get your tickets delivered via WhatsApp
