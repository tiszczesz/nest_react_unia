import { Router, type Request,type Response } from "express";

const router = Router();

// Define a simple route
router.get('/info', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Hello from the server!' });
});