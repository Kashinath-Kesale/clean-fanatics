import {useEffect, useState} from "react";
import {allBookings, getBookingEvents, adminOverride,} from "../services/api";


export default function AdminPanel() {
    const [bookings, setBookings] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [events, setEvents] = useState([]);
    const [overrideTo, setOverrideTo] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);


    const loadBookings = async () => {
        setLoading(true);
        setMessage("");

        const res = await allBookings();
        setBookings(res);

        setLoading(false);
    };


    const loadEvents = async (id) => {
        setSelectedId(id);
        setOverrideTo("");
        setMessage("");

        const res = await getBookingEvents(id);
        setEvents(res);
    };


    const override = async() => {
        if(!overrideTo || !selectedId) return;

        const res = await adminOverride(selectedId, {
            to: overrideTo,
            reason: 'Admin override'
        });

        if(res.error) {
            setMessage(res.error);
        }
        else {
            setMessage('Override successful');
            setOverrideTo("");
            await loadBookings();
            await loadEvents(selectedId);
        }
    };


    useEffect(() => {
        loadBookings();
    }, []);


    return (
        <div>
            <h3>Admin Panel</h3>

            <button onClick={loadBookings} style={{
                padding: "6px 12px",
                marginBottom: "15px",
                cursor: "pointer",
            }}>
            Load / Refresh Bookings
            </button>
            {loading && <p>Loading bookings...</p>}

            {message && <p style={{color: message.toLowerCase().includes("success") ? "#0a7d2c" : "#b00020",
                                    fontWeight: "600", marginBottom: "12px"}}
            >{message}</p>}

            <h4>Bookings</h4>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {bookings.map((b) => (
                    <li
                    key={b._id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "10px",
                        marginBottom: "8px",
                        borderRadius: "4px",
                    }}
                    >
                    <div>
                        <strong>{b.customerName}</strong> — {b.serviceType}
                    </div>

                    <div style={{ fontSize: "14px", marginTop: "4px" }}>
                        Status:{" "}
                        <span
                        style={{
                            fontWeight: "600",
                            color:
                            b.status === "completed"
                                ? "#0a7d2c"
                                : b.status === "cancelled"
                                ? "#b00020"
                                : "#333",
                        }}
                        >
                        {b.status}
                        </span>
                    </div>

                    <div style={{ marginTop: "6px" }}>
                        <button
                        style={buttonStyle}
                        onClick={() => loadEvents(b._id)}
                        >
                        View Events ({b._id.slice(-6)})
                        </button>
                    </div>
                    </li>
                ))}
            </ul>



            {selectedId && (
                <>
                    <h4>Booking Events</h4>
                    <ul>
                        {events.map((e) => (
                            <li key={e._id}>
                                {e.from} - {e.to} ({e.actor})
                            </li>
                        ))}
                    </ul>


                    <h4>Override Status</h4>
                    <input style={inputStyle}  placeholder="new status (eg. cancelled)" value={overrideTo} onChange={(e) => setOverrideTo(e.target.value)}/>

                    <button style={buttonStyle} onClick={override}>Override</button>
                </>
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
