import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async (username,password) => {
    const URI = `mongodb+srv://${username}:${password}@cluster0.u4txy.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URI, {
            tls: true, // Use TLS explicitly
            tlsAllowInvalidCertificates: true, // Allow invalid certificates (use with caution)
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err.message);
    }
};

export default Connection;
