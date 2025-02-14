import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async (username,password) => {
    const URI = `mongodb+srv://${username}:${password}@cluster0.u4txy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    try {
        await mongoose.connect(URI, {
            ssl: true,
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err.message);
    }
};

export default Connection;
