import { Booking, Provider, BookingEvent } from "../models/index.js";
import { validateTrans} from "../utils/bookingState.js";

const logEvent = async({bookingId, from, to, actor, reason = ""}) => {
    await BookingEvent.create({bookingId, from, to, actor, reason});
}

export const createBooking = async({customerName, serviceType, timeSlot}) => {
    const booking = await Booking.create({
        customerName, serviceType, timeSlot
    });

    await logEvent({
        bookingId: booking._id,
        from: 'none',
        to: 'pending',
        actor: 'customer'
    });

    return booking;
}



export const assignProvider = async(bookingId) => {
    const booking = await Booking.findById(bookingId);

    if(!booking) throw new Error('Booking not found');

    if(booking.status !== 'pending' && booking.status !== 'failed') {
        throw new Error('Booking not eligible..')
    }

    const provider = await Provider.findOne({
        isAvailable: true,
        activeBookingId: null
    });

    if(!provider) return null;

    const from = booking.status;

    validateTrans(from,'assigned','system');

    booking.status = 'assigned';
    booking.providerId = provider._id;

    provider.isAvailable = false;
    provider.activeBookingId = booking._id;

    await booking.save();
    await provider.save();

    await logEvent({
        bookingId: booking._id,
        from,
        to: 'assigned',
        actor: 'system'
    });

    return booking;
}



export const updateBooking = async({bookingId, to, actor, reason = ""}) => {
    const booking = await Booking.findById(bookingId);

    if(!booking) throw new Error('Booking not found');

    const from = booking.status;

    validateTrans(from, to, actor);

    booking.status = to;

    
    if(['cancelled', 'failed', 'completed'].includes(to)) {
        if(booking.providerId) {
            const provider = await Provider.findById(booking.providerId);

            if(provider) {
                provider.isAvailable = true;
                provider.activeBookingId = null;
                await provider.save();
            }

            booking.providerId = null;
        }
    }

    if(to === 'failed') booking.retryCount += 1;

    await booking.save();

    await logEvent({
        bookingId, from, to,
        actor, reason
    });

    return booking;
}



export const retryBookingIfPossible = async (bookingId) => {
  const booking = await Booking.findById(bookingId);
  if(!booking) throw new Error("Booking not found");

  if(booking.status !== "failed") return booking;

  if(booking.retryCount > booking.maxRetries) {
    return booking;
  }

  const reassigned = await assignProvider(booking._id);

  return reassigned || booking;
};
