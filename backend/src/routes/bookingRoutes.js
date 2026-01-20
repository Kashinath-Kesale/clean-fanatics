import express from "express";
import {createBookingCont, startBookingCont,completeBookingCont,cancelBookingCont, rejectBookingCont,} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/bookings", createBookingCont);
router.post("/bookings/:id/start", startBookingCont);
router.post("/bookings/:id/complete", completeBookingCont);
router.post("/bookings/:id/cancel", cancelBookingCont);
router.post("/bookings/:id/reject", rejectBookingCont);

export default router;
