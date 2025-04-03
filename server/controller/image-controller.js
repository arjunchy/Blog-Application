import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.BASE_URL || 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;

conn.once('open', () => {
    try {
        gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
            bucketName: 'photos'
        });
        gfs = grid(conn.db, mongoose.mongo);
        gfs.collection('photos');
    } catch (err) {
        console.error('Error initializing GridFS:', err);
    }
});

export const uploadImage = (req, resp) => {
    try {
        console.log('File received:', req.file); // Debugging log
        const fileName = req.file?.filename || req.body.name;

        if (!fileName) {
            console.error('File not found in request');
            return resp.status(400).json({ msg: 'File not found' });
        }

        const imageUrl = `${url}/file/${fileName}`;
        console.log('Image URL:', imageUrl); // Debugging log
        return resp.status(200).json({ url: imageUrl });
    } catch (err) {
        console.error('Error uploading image:', err);
        return resp.status(500).json({ msg: 'Internal server error' });
    }
};

export const getImage = async (req, resp) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });

        if (!file) {
            return resp.status(404).json({ msg: 'File not found' });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(resp);
    } catch (err) {
        console.error('Error retrieving image:', err);
        return resp.status(500).json({ msg: 'Internal server error' });
    }
};