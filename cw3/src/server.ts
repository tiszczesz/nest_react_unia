import express from 'express';
import cors from 'cors';
import router from './router.js';

const app = express();
const port = 3000;
app.use(cors()); //middleware to allow cross-origin requests
app.use(express.json()); //middleware to parse JSON request bodies
app.use('/', router);
// Define a simple route

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});