---
title: "Frontend Components"
permalink: /docs/frontend/components/
excerpt: "Complete reference for all React components in Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# Frontend Components Reference

Complete documentation for all 26 React components in the Cineverse frontend application.

## Component Architecture

```
App.jsx (Root)
├── PublicLayout
│   ├── Navbar
│   ├── Carousel
│   ├── CardComponent
│   ├── MovieDetails
│   ├── Booking
│   ├── SeatLayout
│   ├── Payment
│   ├── PaymentSuccess
│   ├── Confirmation
│   └── Footer
└── AdminLayout
    ├── AdminDashboard
    ├── MoviesPage
    ├── ShowsPage
    ├── TheatrePage
    ├── BookingsPage
    └── UsersPage (SUPER_ADMIN only)
```

---

## Core Components

### Navbar

**File**: `Navbar.jsx`

**Purpose**: Main navigation bar with search, city selector, and authentication

**Features**:
- Real-time movie search with autocomplete
- City selection with localStorage persistence
- Login/Logout functionality
- Responsive mobile menu

**Key State**:
```javascript
const [selectedCity, setSelectedCity] = useState(
  localStorage.getItem("cineverse_city") || "Yelahanka"
);
const [searchText, setSearchText] = useState("");
const [results, setResults] = useState([]);
```

**API Calls**:
- `GET /api/movies/search?query={searchText}` - Search movies

---

### Footer

**File**: `Footer.jsx`

**Purpose**: Footer with links and information

**Sections**:
- About Cineverse
- Quick links
- Social media
- Copyright information

---

## Home Page Components

### Carousel

**File**: `Carousel.jsx`

**Purpose**: Hero carousel displaying featured movies

**Features**:
- Auto-rotating slides
- Manual navigation controls
- Responsive design

**Props**: None (fetches data internally)

---

### CardComponent

**File**: `CardComponent.jsx`

**Purpose**: Display movies grouped by genre

**Features**:
- Horizontal scrollable movie rows
- Genre-based categorization
- Movie cards with poster, rating, and booking button

**API Calls**:
- `GET /api/movies` - Fetch all movies

**Key Logic**:
```javascript
// Group movies by genre
const categoryMap = {};
movies.forEach((movie) => {
  const genreKey = movie.genre?.split("/")[0] || "Others";
  if (!categoryMap[genreKey]) categoryMap[genreKey] = [];
  categoryMap[genreKey].push(movie);
});
```

---

## Booking Flow Components

### MovieDetails

**File**: `MovieDetails.jsx`

**Purpose**: Display detailed movie information

**Features**:
- Movie poster, title, description
- Cast information
- Show listings by city
- Book tickets button

**Route**: `/movie/:id`

**API Calls**:
- `GET /api/movies/{id}` - Movie details
- `GET /api/shows/by-movie/{movieId}?city={city}` - Shows for movie

---

### Booking

**File**: `Booking.jsx`

**Purpose**: Select show and theatre

**Features**:
- Theatre listings
- Show time selection
- Date selection

**Route**: `/booking/:id`

**State Management**:
```javascript
const [shows, setShows] = useState([]);
const [selectedDate, setSelectedDate] = useState(null);
```

---

### SeatLayout

**File**: `SeatLayout.jsx`

**Purpose**: Interactive seat selection

**Features**:
- 13 rows (A-N) × 18 seats per row
- Real-time seat availability (sold/locked/available)
- Seat locking on proceed to payment
- Price calculation

**Route**: `/seat/:id`

**Seat Status Colors**:
- **Green**: Available
- **Dark Green**: Selected
- **Red**: Sold
- **Yellow**: Locked (by another user)

**API Calls**:
- `GET /api/bookings/seat-status/{showId}` - Seat availability
- `POST /api/bookings/lock` - Lock selected seats

**Key Logic**:
```javascript
const handleSeatToggle = (seat) => {
  if (seat.status !== "available") return;
  
  setSelectedSeats((prev) => {
    if (prev.some((s) => s.id === seat.id)) {
      return prev.filter((s) => s.id !== seat.id);
    }
    if (prev.length >= ticketCount) return prev;
    return [...prev, seat];
  });
};
```

---

### Payment

**File**: `Payment.jsx`

**Purpose**: Payment processing

**Features**:
- Booking summary
- Payment method selection
- Stripe integration (optional)

**Route**: `/payment`

**State from Navigation**:
```javascript
const { movie, show, theatre, selectedSeats, amount } = location.state;
```

---

### PaymentSuccess

**File**: `PaymentSuccess.jsx`

**Purpose**: Confirmation after successful payment

**Features**:
- Booking confirmation
- Ticket details
- Download/Share options

**Route**: `/payment-success`

**API Calls**:
- `POST /api/bookings/confirm` - Confirm booking

---

### Confirmation

**File**: `Confirmation.jsx`

**Purpose**: Booking confirmation page

**Features**:
- Booking details
- QR code (optional)
- Print ticket option

**Route**: `/confirmation`

---

## Admin Panel Components

### AdminLayout

**File**: `AdminLayout.jsx`

**Purpose**: Layout wrapper for admin pages

**Features**:
- Sidebar navigation
- Admin header
- Role-based menu items

**Navigation Items**:
- Dashboard
- Movies
- Shows
- Theatres
- Bookings
- Users (SUPER_ADMIN only)

---

### AdminDashboard

**File**: `AdminDashboard.jsx`

**Purpose**: Admin dashboard with statistics

**Features**:
- Total bookings count
- Total revenue
- Recent bookings
- Quick actions

**API Calls**:
- `GET /api/bookings/all` - All bookings

---

### MoviesPage

**File**: `MoviesPage.jsx`

**Purpose**: Manage movies (CRUD)

**Features**:
- List all movies
- Add new movie with poster upload
- Edit movie details
- Delete movie

**API Calls**:
- `GET /api/movies` - List movies
- `POST /api/movies` - Create movie (multipart/form-data)
- `PUT /api/movies/{id}` - Update movie
- `DELETE /api/movies/{id}` - Delete movie

**Form Fields**:
- Title, Genre, Language
- Duration, Rating, Release Date
- Cast (array), Description
- Poster image upload

---

### ShowsPage

**File**: `ShowsPage.jsx`

**Purpose**: Manage shows (CRUD)

**Features**:
- List all shows
- Create show (movie + theatre + time + price)
- Edit show
- Delete show

**API Calls**:
- `GET /api/shows` - List all shows
- `POST /api/shows` - Create show
- `PUT /api/shows/{id}` - Update show
- `DELETE /api/shows/{id}` - Delete show

---

### TheatrePage

**File**: `TheatrePage.jsx`

**Purpose**: Manage theatres (CRUD)

**Features**:
- List all theatres
- Add new theatre
- Edit theatre details
- Delete theatre

**API Calls**:
- `GET /api/theatres/list` - List theatres
- `POST /api/theatres` - Create theatre
- `PUT /api/theatres/{id}` - Update theatre
- `DELETE /api/theatres/{id}` - Delete theatre

**Form Fields**:
- Name, Address, City
- Screen Type (2D/3D/IMAX)
- Total Seats

---

### BookingsPage

**File**: `BookingsPage.jsx`

**Purpose**: View all bookings (Admin)

**Features**:
- List all bookings
- Filter by date/status
- View booking details

**API Calls**:
- `GET /api/bookings/all` - All bookings

---

### UsersPage

**File**: `UsersPage.jsx`

**Purpose**: User management (SUPER_ADMIN only)

**Features**:
- List all users
- View user details
- Manage user roles

**Access Control**:
```javascript
localStorage.getItem("cineverse_role") === "SUPER_ADMIN"
  ? <UsersPage />
  : <Navigate to="/admin" replace />
```

---

## Authentication Components

### Login

**File**: `Login.jsx`

**Purpose**: User login and signup

**Features**:
- Login form
- Signup form
- Toggle between login/signup
- JWT token storage

**API Calls**:
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration

**Token Storage**:
```javascript
localStorage.setItem('cineverse_token', token);
localStorage.setItem('cineverse_role', role);
localStorage.setItem('cineverse_userId', userId);
localStorage.setItem('cineverse_username', username);
```

---

## Utility Components

### Errorpage

**File**: `Errorpage.jsx`

**Purpose**: 404 error page

**Features**:
- Custom 404 message
- Navigation back to home

**Route**: `*` (catch-all)

---

## Component Best Practices

### State Management

```javascript
// Use useState for local component state
const [movies, setMovies] = useState([]);

// Use useEffect for data fetching
useEffect(() => {
  loadMovies();
}, []);
```

### API Integration

```javascript
// Use apiClient for authenticated requests
import api from './apiClient';

const response = await api.get('/api/movies');
```

### Navigation

```javascript
// Use useNavigate for programmatic navigation
const navigate = useNavigate();
navigate('/movie/123', { state: { movie } });

// Use Link for declarative navigation
<Link to="/movie/123">View Movie</Link>
```

### Error Handling

```javascript
try {
  const response = await api.get('/api/movies');
  setMovies(response.data);
} catch (error) {
  console.error('Error loading movies:', error);
  alert('Failed to load movies');
}
```

---

## Styling

All components use **inline Tailwind CSS** classes:

```javascript
<div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-all">
  <h2 className="text-2xl font-bold text-gray-800">Title</h2>
</div>
```

### Common Tailwind Patterns

- **Container**: `max-w-screen-2xl mx-auto px-4`
- **Card**: `bg-white shadow-lg rounded-lg p-6`
- **Button**: `bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg`
- **Grid**: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## Responsive Design

All components are mobile-responsive using Tailwind breakpoints:

- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

Example:
```javascript
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

---

## Component Testing

### Manual Testing Checklist

- [ ] Component renders without errors
- [ ] API calls work correctly
- [ ] Error states handled gracefully
- [ ] Loading states displayed
- [ ] Responsive on mobile/tablet/desktop
- [ ] Navigation works correctly
- [ ] Forms validate input
- [ ] Authentication required for protected routes

---

## Common Issues

### Issue 1: Token Not Found

**Solution**: Check localStorage for `cineverse_token`

### Issue 2: CORS Error

**Solution**: Verify API Gateway CORS configuration

### Issue 3: Seat Already Booked

**Solution**: Refresh seat status before locking

---

## Summary

The Cineverse frontend consists of:
- **26 React components**
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **LocalStorage** for state persistence
