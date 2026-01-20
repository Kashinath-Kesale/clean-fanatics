import mongoose from "mongoose";

const bookingEvent = new mongoose.Schema({
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking", required: true
    },

    from: {type: String, required: true},

    to: {type: String, required: true},

    actor: {
        type: String,
        enum: ["customer", "provider", "admin", "system"],
        required: true,
    },

    reason: {
        type: String,
        default: "",
    },
  },
  {timestamps: true}
);

bookingEvent.index({bookingId: 1});


export const BookingEvent = mongoose.model("BookingEvent",bookingEvent);
