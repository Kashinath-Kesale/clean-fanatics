import {Booking, BookingEvent} from "../models/index.js";
import {validateTrans} from "../utils/bookingState.js";

export const allBookings = async(req, res)=>{
    try{
        const filter = {};

        if(req.query.status) filter.status = req.query.status;
        if(req.query.providerId) filter.providerId = req.query.providerId;

        const bookings = await Booking.find(filter);
        res.json(bookings);

    }
    catch(err){
        res.status(400).json({error: err.message});
    }
}



export const history = async(req, res)=>{
    try{
        const events = await BookingEvent.find({
            bookingId: req.params.id,
        }).sort({createdAt: 1});

        res.json(events);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
};



export const overrideBooking = async(req, res)=> {
    try{
        const {to, reason} = req.body;

        const booking = await Booking.findById(req.params.id);
        if(!booking) throw new Error('Booking not found');

        const from = booking.status;

        if(from !== to) {
            validateTrans(from, to, 'admin');
            booking.status = to;
            await booking.save();
        }

        await BookingEvent.create({
            bookingId: booking._id, from, to,
            actor: 'admin', reason: reason || 'manual override',
        });

        res.json(booking);
    }
    catch(err) {
        res.status(400).json({error: err.message});
    }
}