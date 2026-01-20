import express from "express";
import {allBookings, history, overrideBooking} from "../controllers/adminController.js";

const router = express.Router();

router.get('/admin/bookings', allBookings);
router.get('/admin/bookings/:id/events', history);
router.post('/admin/bookings/:id/override', overrideBooking);


export default router;