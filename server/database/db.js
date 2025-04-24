import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async (username,password) => {
    // const URI = `mongodb+srv://${username}:${password}@cluster0.u4txy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    const URI = `mongodb://admin:admin@mongo:27017/?authSource=admin`;

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err.message);
    }
};

export default Connection;
