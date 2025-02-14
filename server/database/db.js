import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    const URI = "mongodb+srv://arjunchaudhary477058:<db_password>@blog-app.hgznn.mongodb.net/?retryWrites=true&w=majority&appName=blog-app";

    try {
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            ssl: true,
        });
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err.message);
    }
};

export default Connection;
