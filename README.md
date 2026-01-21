# Clean Fanatics – Full Stack Engineering Assignment

## Overview

This project is a small working system for a home services marketplace where customers create bookings, providers fulfill them, and admins manage the flow.
The focus is on **booking lifecycle, state handling, and edge cases**, not UI polish.

---

## What is implemented

### Booking flow

* Customer creates a booking
* System automatically assigns an available provider
* Booking moves through states:

  ```
  pending → assigned → in_progress → completed
  ```
* Terminal states:

  * cancelled
  * failed

---

### Provider workflow (handled in backend)

* Provider **accepts** a booking → `assigned → in_progress`
* Provider **rejects / no-show** → `assigned → failed`
* Providers are locked to one active booking
* Providers are released when a booking is completed, cancelled, or failed

*(Provider actions are modeled via state transitions instead of a separate provider UI.)*

---

### Failure handling

* Customer or provider can cancel a booking
* Failed bookings can be retried
* Retry count is limited
* System attempts reassignment when possible

---

### Admin / Ops support

* View all bookings
* View booking state history
* Manually override booking status when needed

---

### Observability

* Every state change is recorded with:

  * from state
  * to state
  * actor (customer / system / admin)
* Booking history can be viewed in the admin panel

---

## User Interface

The UI has **three simple screens**:

1. **Create Booking** – customer creates a booking
2. **Booking Status** – view booking status using booking ID
3. **Admin Panel** – view bookings, booking history, and override status

The UI is intentionally minimal to keep focus on system behavior.

---

## Tech Stack

* **Backend:** Node.js, Express, MongoDB
* **Frontend:** React (Vite), React Router

---

## How to run locally

### Backend

```bash
cd backend
npm install
```

Create `.env`:

```env
PORT=5000
MONGO_URI=<your_mongodb_uri>
```

Run backend:

```bash
npm run dev
```

---

### Seed providers (one time)

```bash
node src/utils/providers.js
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Notes

* Automatic provider assignment is used
* Provider actions are handled via backend logic
* No authentication or payments added

---

Thank you for reviewing this submission.

---

