import {useState} from 'react';
import {createBooking} from '../services/api.js';


export default function CreateBooking(){
    const [form, setForm] = useState({customerName:"", serviceType:"", timeSlot:""});
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange =(e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const submit = async() => {
        setError(null);
        setResult(null);

        if(!form.customerName || !form.serviceType || !form.timeSlot) {
            setError('all fields are required');
            return;
        }

        const res = await createBooking(form);

        if(res.error) {
            setError(res.error);
        } 
        else {
            setResult(res);
        }
    }


    return(
        <div>
            <h3>Create Booking..</h3>

            <input style={inputStyle}  name='customerName' placeholder='Customer Name' value={form.customerName} onChange={handleChange} />
            <br /> <br />

            <input style={inputStyle}  name='serviceType' placeholder='ServiceType' value={form.serviceType} onChange={handleChange} />
            <br /> <br />

            <input style={inputStyle}  name="timeSlot" placeholder="Time Slot" value={form.timeSlot} onChange={handleChange}/>
            <br /><br />

            <button style={buttonStyle} onClick={submit}>Create</button>

            {error && <p style={{color: 'red'}}>{error}</p>}

            {result && (<pre style={{background: "#f4f4f4", padding: "10px"}}>
                    {JSON.stringify(result, null, 2)}
                </pre>
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
