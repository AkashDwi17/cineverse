---
title: "UI Components"
permalink: /docs/frontend/ui-components/
excerpt: "Reusable UI components documentation for Cineverse"
last_modified_at: 2025-01-17
toc: true
---

# UI Components

## Component Library

Cineverse uses a custom component library built with React.

## Core Components

### Button
```jsx
<Button 
  variant="primary" 
  size="large"
  onClick={handleClick}
>
  Book Tickets
</Button>
```

### Card
```jsx
<Card>
  <CardHeader>
    <h3>Movie Title</h3>
  </CardHeader>
  <CardBody>
    <p>Movie description...</p>
  </CardBody>
  <CardFooter>
    <Button>View Shows</Button>
  </CardFooter>
</Card>
```

### Modal
```jsx
<Modal isOpen={isOpen} onClose={handleClose}>
  <ModalHeader>Confirm Booking</ModalHeader>
  <ModalBody>
    Are you sure you want to book these seats?
  </ModalBody>
  <ModalFooter>
    <Button onClick={handleConfirm}>Confirm</Button>
    <Button variant="secondary" onClick={handleClose}>Cancel</Button>
  </ModalFooter>
</Modal>
```

## Form Components

- Input
- Select
- Checkbox
- Radio
- TextArea

## Layout Components

- Container
- Grid
- Flex
- Spacer

## Styling

Components use CSS modules for styling:
```css
/* Button.module.css */
.button {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.button-primary {
  background-color: #e50914;
  color: white;
}

.button-primary:hover {
  background-color: #b20710;
}
```
