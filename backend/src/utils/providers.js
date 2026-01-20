import mongoose from "mongoose";
import dotenv from "dotenv";
import {Provider} from "../models/index.js";


dotenv.config();

const providers = [{name: 'Provider A'}, {name: 'Provider B'}, {name: 'Provider C'}];


const seedingProviders = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        await Provider.deleteMany();

        await Provider.insertMany(providers);

        console.log('providers seeded successfully');
        process.exit();

    }
    catch(err) {
        console.log('seeding failed', err);
        process.exit(1);
    }
};

seedingProviders();