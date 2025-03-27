import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridfsBucket;

// Initialize GridFS and GridFSBucket when the MongoDB connection is open
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos', // Bucket name for storing files
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos'); // Set the collection name
});

// Controller to handle file uploads
export const uploadImage = (req, resp) => {
    if (!req.file) {
        return resp.status(404).json("File not found");
    }

    // Construct the image URL using the file's ID
    const imageUrl = `${url}/file/${req.file.id}`; // Use req.file.id for GridFS
    resp.status(200).json({ imageUrl });
};

// Controller to retrieve an image by its filename or ID
export const getImage = async (req, resp) => {
    try {
        // Find the file in the GridFS collection by its ID
        const file = await gfs.files.findOne({ _id: new mongoose.Types.ObjectId(req.params.id) });
        if (!file) {
            return resp.status(404).json({ msg: 'File not found' });
        }

        // Create a read stream to pipe the file to the response
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(resp);
    } catch (err) {
        return resp.status(500).json({ msg: 'Internal server error' });
    }
};