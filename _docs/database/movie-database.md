---
title: "Movie Service Database (MongoDB)"
permalink: /docs/database/movie-database/
excerpt: "MongoDB schema for movies stored in movie_db.movies collection."
last_modified_at: 2025-12-05
toc: true
---

# Movie Service Database (MongoDB)

Database: **movie_db**  
Collection: **movies**

Movies are stored as JSON documents.

---

## 📌 Example Movie Document

```json
{
  "_id": "69246514c412948190c5fb80",
  "title": "Avenger",
  "genre": "Action",
  "language": "English",
  "durationMinutes": 180,
  "rating": 9.2,
  "releaseDate": "2019-04-26",
  "posterUrl": "https://res.cloudinary.com/dhwoy4zgp/image/upload/v1763992851/qprqczak...",
  "cast": [
    "Robert Downey Jr.",
    "Chris Evans",
    "Scarlett Johansson"
  ],
  "_class": "com.dac.movieService.model.Movie"
}
```
