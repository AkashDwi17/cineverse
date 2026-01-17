---
title: "Booking Flow"
permalink: /docs/frontend/usereffectvoting/
excerpt: "User booking experience and interactive effects"
last_modified_at: 2025-01-17
toc: true
---

# Booking Flow

## Overview

The booking interface provides an intuitive and seamless way for users to book movie tickets.

## Booking Flow

1. User logs in to the system
2. Browses available movies
3. Selects a movie
4. Chooses theatre and show time
5. Selects seats
6. Confirms booking
7. Receives WhatsApp ticket

## UI Components

### Movie List
```jsx
import React, { useEffect, useState } from 'react';
import { getMovies } from '../api/movies';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      const data = await getMovies();
      setMovies(data);
    }
    fetchMovies();
  }, []);

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

### Seat Selection Interface

The seat selection interface includes:

- **Seat Grid**: Visual representation of theatre seats
- **Legend**: Shows available, selected, and booked seats
- **Price Summary**: Displays total price based on selection
- **Confirm Button**: Proceeds to payment/confirmation

## Visual Effects

### Booking Animation

When a user confirms a booking, the system displays:

1. Loading spinner during submission
2. Success checkmark animation
3. Confetti effect (optional)
4. Ticket confirmation message

### Real-time Updates

- Seat availability updates in real-time
- Show timings and availability refresh automatically
- Price changes are reflected immediately

## Accessibility

- Keyboard navigation support
- Screen reader compatible
- High contrast mode
- Large touch targets for mobile

## Security Features

- One booking per session until confirmed/cancelled
- Seat lock expires after 10 minutes if not confirmed
- Encrypted payment transmission
- Secure ticket generation
