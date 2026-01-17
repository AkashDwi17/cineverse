---
title: "State Management & API Integration"
permalink: /docs/frontend/state-api/
excerpt: "State management and API integration patterns in Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# State Management & API Integration

## State Management

Cineverse uses **LocalStorage** and **React useState** for state management.

### LocalStorage Keys

| Key | Value | Purpose |
|-----|-------|---------|
| `cineverse_token` | JWT token | Authentication |
| `cineverse_role` | USER/ADMIN/SUPER_ADMIN | Authorization |
| `cineverse_userId` | User ID | Booking operations |
| `cineverse_username` | Username/Email | User identification |
| `cineverse_city` | City name | Location filtering |

### Authentication State

```javascript
// Store after login
localStorage.setItem('cineverse_token', token);
localStorage.setItem('cineverse_role', role);
localStorage.setItem('cineverse_userId', userId);

// Check if logged in
const isLoggedIn = !!localStorage.getItem('cineverse_token');

// Get user role
const role = localStorage.getItem('cineverse_role');

// Logout
localStorage.removeItem('cineverse_token');
localStorage.removeItem('cineverse_role');
localStorage.removeItem('cineverse_userId');
```

---

## API Integration

### API Client Setup

**File**: `apiClient.js`

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

// Automatically add JWT token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cineverse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
```

### Environment Variables

**File**: `.env`

```
VITE_BASE_URL=http://localhost:9191
```

---

## API Service Layer

### Auth Service

**File**: `services/authService.js`

```javascript
import api from '../apiClient';

export const signup = async (payload) => {
  const res = await api.post('/api/auth/signup', payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await api.post('/api/auth/login', payload);
  return res.data;
};
```

### Movie Service

**File**: `services/movieService.js`

```javascript
import api from '../apiClient';

export const getMovies = async () => {
  const res = await api.get('/api/movies');
  return res.data;
};

export const searchMovies = async (query) => {
  const res = await api.get(`/api/movies/search?query=${query}`);
  return res.data;
};
```

---

## Component State Patterns

### Data Fetching

```javascript
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await api.get('/api/movies');
      setMovies(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  loadMovies();
}, []);
```

### Form State

```javascript
const [formData, setFormData] = useState({
  title: '',
  genre: '',
  language: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  await api.post('/api/movies', formData);
};
```

---

## Error Handling

```javascript
try {
  const response = await api.post('/api/bookings/lock', data);
} catch (error) {
  if (error.response?.status === 400) {
    alert('Seat already booked');
  } else if (error.response?.status === 401) {
    navigate('/login');
  } else {
    alert('An error occurred');
  }
}
```

---

## Summary

- **LocalStorage** for authentication state
- **useState** for component state
- **Axios** with interceptors for API calls
- **Service layer** for API abstraction
