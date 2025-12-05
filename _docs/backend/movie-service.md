
---

### 3) `movie-service.md`
```md
---
title: "Movie Service"
permalink: /docs/backend/movie-service/
excerpt: "Manages movie metadata (title, description, language, genre, release date)."
last_modified_at: 2025-12-05
toc: true
---

# Movie Service

**Port (example):** `8083`

## Responsibilities
- CRUD operations for movies
- Expose movie listings and details used by show service

## Data model
- `id` (Long)  
- `title` (String)  
- `description` (String)  
- `language` (String)  
- `genre` (String)  
- `releaseDate` (Date)  
- `duration` (Integer)

## APIs

### GET `/api/movies/list`
List movies.

### GET `/api/movies/view/{id}`
Get a single movie.

### POST `/api/movies` (ADMIN)
```json
{
  "title":"Avengers",
  "description":"Superhero movie",
  "language":"English",
  "genre":"Action",
  "releaseDate":"2025-11-15",
  "duration":180
}
