import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import CreateBooking from "./pages/createBooking";
import BookingStatus from "./pages/bookingStatus";
import AdminPanel from "./pages/adminPanel";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CreateBooking />} />
          <Route path="/status" element={<BookingStatus />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
