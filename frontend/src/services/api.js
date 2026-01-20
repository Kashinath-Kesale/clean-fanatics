const BASE_URL = "http://localhost:5000/api";

export const createBooking = async(data) => {
    const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });
    
    return res.json();
}



export const getBooking = async(id) =>{
    const res = await fetch(`${BASE_URL}/admin/bookings`);
    const data = await res.json();
    return data.find((b) => b._id === id) || {error: 'Booking not found'};
};


export const allBookings = async()=>{
    const res = await fetch(`${BASE_URL}/admin/bookings`);
    return res.json();
} 


export const getBookingEvents = async(id) => {
    const res = await fetch(`${BASE_URL}/admin/bookings/${id}/events`);
    return res.json();
}



export const adminOverride = async(id, data) =>{
    const res = await fetch(`${BASE_URL}/admin/bookings/${id}/override`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    return res.json();
}