---
title: "Feedback System"
permalink: /docs/frontend/feedback/
excerpt: "User feedback and rating system for movie booking experience"
last_modified_at: 2025-01-17
toc: true
---

# Feedback System

## Overview

The feedback system allows users to provide feedback about their movie booking experience and report issues.

## Feedback Types

1. **General Feedback**: Overall booking experience
2. **Technical Issues**: Bugs or errors during booking
3. **Feature Requests**: Suggestions for improvement
4. **Usability**: UI/UX feedback

## Feedback Component
```jsx
import React, { useState } from 'react';

function FeedbackForm() {
  const [feedback, setFeedback] = useState({
    type: 'general',
    rating: 5,
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Submit feedback to API
    await submitFeedback(feedback);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select 
        value={feedback.type} 
        onChange={(e) => setFeedback({...feedback, type: e.target.value})}
      >
        <option value="general">General Feedback</option>
        <option value="bug">Report Bug</option>
        <option value="feature">Feature Request</option>
        <option value="booking">Booking Issue</option>
        <option value="payment">Payment Issue</option>
      </select>
      
      <div className="rating">
        {[1, 2, 3, 4, 5].map(star => (
          <Star 
            key={star}
            filled={star <= feedback.rating}
            onClick={() => setFeedback({...feedback, rating: star})}
          />
        ))}
      </div>
      
      <textarea
        value={feedback.message}
        onChange={(e) => setFeedback({...feedback, message: e.target.value})}
        placeholder="Tell us about your experience..."
      />
      
      <button type="submit">Submit Feedback</button>
    </form>
  );
}
```

## Rating System

Users can rate their experience on a scale of 1-5 stars:

- ⭐ 1 star: Very poor
- ⭐⭐ 2 stars: Poor
- ⭐⭐⭐ 3 stars: Average
- ⭐⭐⭐⭐ 4 stars: Good
- ⭐⭐⭐⭐⭐ 5 stars: Excellent

## Admin Dashboard

Admins can view:

- All feedback submissions
- Average ratings per movie/theatre
- Common booking issues
- Trend analysis

## Notifications

Users receive notifications when:

- Feedback is received
- Issue is being investigated
- Issue is resolved
- Feature request is implemented
