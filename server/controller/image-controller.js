
const url = 'http://localhost:8000'

export const uploadImage = (req, resp) => {
    if (!req.file) {
        return resp.status(400).send('File not found');
    }

    const imageUrl = `${url}/file/${req.file.filename}`

    return resp.status(200).json({ imageUrl });
}