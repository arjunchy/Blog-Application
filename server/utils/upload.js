import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.u4txy.mongodb.net/?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpg', 'image/jpeg'];

        // Check if the file's MIME type matches the allowed types
        if (match.indexOf(file.mimetype) === -1) {
            return `${Date.now()}-blog-${file.originalname}`; // Filename for unsupported types
        }

        return {
            bucketName: 'photos', // GridFS bucket name
            filename: `${Date.now()}-blog-${file.originalname}`, // Unique filename
        };
    },
});

export default multer({ storage });