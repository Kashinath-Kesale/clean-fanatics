import {createBooking, assignProvider, updateBooking, retryBookingIfPossible} from "../services/booking.js";
import { Booking } from "../models/index.js";

export const createBookingCont = async(req, res) =>{
    try{
        const booking = await createBooking(req.body);
        await assignProvider(booking._id);
        const updatedBooking = await Booking.findById(booking._id);
        res.status(201).json(updatedBooking);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
};


export const startBookingCont = async(req, res)=> {
    try{
        const booking = await updateBooking({
            bookingId: req.params.id,
            to: 'in_progress',
            actor: 'provider',
        });

        res.json(booking);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}


export const completeBookingCont = async(req, res) =>{
    try{
        const booking = await updateBooking({
            bookingId: req.params.id,
            to: 'completed',
            actor: 'provider'
        });

        res.json(booking);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};



export const cancelBookingCont = async(req, res)=>{
  try{
    const booking = await updateBooking({
      bookingId: req.params.id,
      toStatus: "cancelled",
      actor: req.body.actor,
      reason: req.body.reason,
    });

    res.json(booking);
  } 
  catch(err) {
    res.status(400).json({ error: err.message });
  }
};


export const rejectBookingCont = async(req, res)=> {
    try{
        const booking = await updateBooking({
            bookingId: req.params.id,
            to: 'failed',
            actor: 'provider',
            reason: 'Provider rejected the booking',
        });

        await retryBookingIfPossible(booking._id);

        res.json(booking);
    }
    catch(err){
        res.status(400).json({error: err.message});
    }
};