import express from "express";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from './routes/adminRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', bookingRoutes);
app.use('/api', adminRoutes);


export default app;
