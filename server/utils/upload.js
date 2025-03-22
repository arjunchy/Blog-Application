import { GridFsStorage } from 'multer-gridfs-storage';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb+srv://${username}:${password}@cluster0.u4txy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    options: { useNewUrlParser: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpg', 'image/jpeg'];

        if (match.indexOf(file.mimetype) == -1) {
            return `${Date.now()}-blog-${file.originalname}}`
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}}`
        }
    }

})

export default multer({ storage });