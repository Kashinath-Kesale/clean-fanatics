import { useState } from "react";
import { getBooking } from "../services/api";

export default function BookingStatus(){
    const [bookingId, setBookingId] = useState("");
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState(null);

    const fetchBooking = async()=>{
        setError(null);
        setBooking(null);

        if(!bookingId) {
            setError('booking ID required');
            return;
        }

        const res = await getBooking(bookingId);

        if(res.error) setError(res.error);
        else setBooking(res);
    };



    return(
        <div>
            <h3>Booking Status..</h3>

            <input style={inputStyle}  placeholder="Booking Id" value={bookingId} onChange={(e) => setBookingId(e.target.value)}/>

            <button style={buttonStyle} onClick={fetchBooking}>Fetch</button>

            {error && <p style={{color: 'red'}}>{error}</p>}

            {booking && (
            <div style={{ border: "1px solid #ddd", padding: "12px", marginTop: "10px" }}>
                <p><strong>Customer:</strong> {booking.customerName}</p>
                <p><strong>Service:</strong> {booking.serviceType}</p>
                <p><strong>Time Slot:</strong> {booking.timeSlot}</p>
                <p>
                <strong>Status:</strong>{" "}
                <span style={{ fontWeight: "600" }}>{booking.status}</span>
                </p>
            </div>
            )}

        </div>
    )
}


const inputStyle = {
  display: "block",
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
};

const buttonStyle = {
  padding: "8px 16px",
  cursor: "pointer",
};
