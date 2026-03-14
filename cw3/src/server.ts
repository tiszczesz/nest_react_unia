import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors()); //middleware to allow cross-origin requests
app.use(express.json()); //middleware to parse JSON request bodies

// Define a simple route
app.get('/info', (req, res) => {
    res.json({ message: 'Hello from the server!' });
});
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});