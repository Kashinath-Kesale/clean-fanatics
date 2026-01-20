import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true},

    isAvailable: {type: Boolean, default: true},

    activeBookingId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
  },

  {timestamps: true}
);

providerSchema.index({isAvailable: 1});


export const Provider = mongoose.model("Provider", providerSchema);
