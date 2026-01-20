import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerName: {type: String, required: true, trim: true},

    serviceType: {type:String, required: true},

    timeSlot: {type: String, required: true},

    status: {
        type: String,
        enum: ['pending', 'assigned', 'completed', 'in_progress', 'completed', 'cancelled', 'failed'],
        default: 'pending',
    },

    providerId: {type: mongoose.Schema.Types.ObjectId,
        ref: 'Provider',
        default: null,
    },

    retryCount: {type: Number, default: 0},

    maxRetries: {type: Number, default: 2},

}, 
{timeStamps: true}
);

bookingSchema.index({status: 1});
bookingSchema.index({providerId: 1});


export const Booking = mongoose.model('Booking', bookingSchema);