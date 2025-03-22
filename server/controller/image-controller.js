import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:8000';

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
})

export const uploadImage = (req, resp) => {
    const fileName = req.file?.filename || req.body.name;

    if (!fileName) {
        return resp.status(400).json({ msg: 'File not found' });
    }

    const imageUrl = `${url}/file/${fileName}`;

    return resp.status(200).json({ url: imageUrl });
};

export const getImage = async (req, resp) => {
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(resp);

    } catch (err) {
        return resp.status(500).json({ msg: 'Internal server error' });
    }
}