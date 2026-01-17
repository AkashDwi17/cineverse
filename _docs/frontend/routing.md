---
title: "Routing & Navigation"
permalink: /docs/frontend/routing/
excerpt: "Routing structure and navigation in Cineverse"
last_modified_at: 2026-01-18
toc: true
---

# Routing & Navigation

Complete guide to routing and navigation in the Cineverse frontend application.

## Route Structure

```
/ (Public Layout)
├── /login - Login/Signup page
├── / - Home (Carousel + Movies)
├── /movie/:id - Movie details
├── /booking/:id - Show selection
├── /seat/:id - Seat selection
├── /payment - Payment processing
├── /payment-success - Payment confirmation
└── /confirmation - Booking confirmation

/admin (Admin Layout - Protected)
├── /admin - Dashboard
├── /admin/movies - Movie management
├── /admin/shows - Show management
├── /admin/theatres - Theatre management
├── /admin/bookings - Booking management
└── /admin/users - User management (SUPER_ADMIN only)
```

---

## Router Configuration

**File**: `App.jsx`

```javascript
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<><Carousel /><CardComponent /></>} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/booking/:id" element={<Booking />} />
          <Route path="/seat/:id" element={<SeatLayout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<AdminDashboard />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="shows" element={<ShowsPage />} />
          <Route path="theatres" element={<TheatrePage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="users" element={
            localStorage.getItem("cineverse_role") === "SUPER_ADMIN"
              ? <UsersPage />
              : <Navigate to="/admin" replace />
          } />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Layouts

### PublicLayout

Wraps public pages with Navbar and Footer:

```javascript
function PublicLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdmin && <Navbar />}
      <Outlet />
      {!isAdmin && <Footer />}
    </>
  );
}
```

### AdminLayout

Wraps admin pages with sidebar navigation:

```javascript
export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
```

---

## Protected Routes

### AdminRoute Component

Protects admin routes from unauthorized access:

```javascript
function AdminRoute({ children }) {
  const token = localStorage.getItem("cineverse_token");
  const role = localStorage.getItem("cineverse_role");

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Not admin or super_admin
  if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}
```

**Access Control**:
- **No token** → Redirect to `/login`
- **USER role** → Redirect to `/` (home)
- **ADMIN/SUPER_ADMIN** → Allow access

---

## Navigation Methods

### Programmatic Navigation

Use `useNavigate` hook:

```javascript
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

// Simple navigation
navigate('/movie/123');

// Navigation with state
navigate('/payment', {
  state: {
    movie,
    show,
    selectedSeats,
    amount: 500
  }
});

// Go back
navigate(-1);

// Replace current entry
navigate('/login', { replace: true });
```

---

### Declarative Navigation

Use `Link` component:

```javascript
import { Link } from 'react-router-dom';

<Link to="/movie/123" className="btn">
  View Movie
</Link>

// With state
<Link 
  to="/booking/5" 
  state={{ movie, theatre }}
>
  Book Tickets
</Link>
```

---

## Route Parameters

### URL Parameters

Access with `useParams`:

```javascript
import { useParams } from 'react-router-dom';

function MovieDetails() {
  const { id } = useParams(); // /movie/:id
  
  useEffect(() => {
    loadMovie(id);
  }, [id]);
}
```

### Query Parameters

Access with `useSearchParams`:

```javascript
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');
  const city = searchParams.get('city');
  
  // URL: /search?query=avengers&city=bangalore
}
```

---

## Navigation State

Pass data between routes using `state`:

**Sender**:
```javascript
navigate('/seat/5', {
  state: {
    movie: { id: '123', title: 'Avengers' },
    show: { id: 5, time: '18:30' },
    theatre: { id: 1, name: 'PVR' }
  }
});
```

**Receiver**:
```javascript
import { useLocation } from 'react-router-dom';

function SeatLayout() {
  const location = useLocation();
  const { movie, show, theatre } = location.state || {};
  
  if (!movie) {
    navigate('/'); // Redirect if no state
  }
}
```

---

## Booking Flow Navigation

Complete user journey:

```
1. Home (/)
   ↓ Click movie card
   
2. Movie Details (/movie/:id)
   ↓ Click "Book Tickets"
   
3. Booking (/booking/:id)
   ↓ Select show
   
4. Seat Layout (/seat/:showId)
   ↓ Select seats → Lock seats
   
5. Payment (/payment)
   ↓ Complete payment
   
6. Payment Success (/payment-success)
   ↓ Confirm booking
   
7. Confirmation (/confirmation)
   ↓ View ticket
```

**State Flow**:
```javascript
// Step 2 → 3
navigate(`/booking/${movie.id}`, { state: { movie } });

// Step 3 → 4
navigate(`/seat/${show.id}`, { state: { movie, show, theatre } });

// Step 4 → 5
navigate('/payment', { state: { movie, show, theatre, selectedSeats, amount } });

// Step 5 → 6
navigate('/payment-success', { state: { bookingId, movie, show } });
```

---

## Admin Navigation

### Sidebar Menu

```javascript
const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: '📊' },
  { path: '/admin/movies', label: 'Movies', icon: '🎬' },
  { path: '/admin/shows', label: 'Shows', icon: '🎭' },
  { path: '/admin/theatres', label: 'Theatres', icon: '🏛️' },
  { path: '/admin/bookings', label: 'Bookings', icon: '🎫' },
];

// SUPER_ADMIN only
if (role === 'SUPER_ADMIN') {
  menuItems.push({ path: '/admin/users', label: 'Users', icon: '👥' });
}
```

---

## Navigation Guards

### Check Authentication

```javascript
useEffect(() => {
  const token = localStorage.getItem('cineverse_token');
  if (!token) {
    navigate('/login');
  }
}, []);
```

### Check Role

```javascript
useEffect(() => {
  const role = localStorage.getItem('cineverse_role');
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    navigate('/');
  }
}, []);
```

---

## Breadcrumbs

Implement breadcrumbs for better UX:

```javascript
function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  
  return (
    <nav className="flex gap-2 text-sm">
      <Link to="/">Home</Link>
      {pathnames.map((name, index) => {
        const path = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        
        return isLast ? (
          <span key={path}> / {name}</span>
        ) : (
          <Link key={path} to={path}> / {name}</Link>
        );
      })}
    </nav>
  );
}
```

---

## 404 Handling

Custom 404 page:

```javascript
function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Page not found</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-6 btn-primary"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
```

---

## Navigation Best Practices

1. **Always handle missing state** - Check if navigation state exists
2. **Use replace for redirects** - Prevent back button issues
3. **Clear sensitive data** - Remove tokens on logout
4. **Validate permissions** - Check roles before rendering admin routes
5. **Handle errors gracefully** - Redirect to error page if needed
6. **Preserve scroll position** - Use `scrollRestoration` if needed

---

## Common Navigation Patterns

### Logout and Redirect

```javascript
const handleLogout = () => {
  localStorage.removeItem('cineverse_token');
  localStorage.removeItem('cineverse_role');
  localStorage.removeItem('cineverse_userId');
  navigate('/login', { replace: true });
};
```

### Conditional Redirect

```javascript
useEffect(() => {
  if (!selectedSeats.length) {
    navigate('/'); // Redirect if no seats selected
  }
}, [selectedSeats]);
```

### Back Navigation

```javascript
<button onClick={() => navigate(-1)}>
  ← Back
</button>
```

---

## Summary

Cineverse uses **React Router v6** with:
- **Nested routes** for layouts
- **Protected routes** for admin access
- **Navigation state** for data passing
- **Role-based access control**
- **404 handling** for invalid routes
