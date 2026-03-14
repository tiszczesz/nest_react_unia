import { Router, type Request,type Response } from "express";
import fs from 'fs/promises';

const router = Router();

// Define a simple route
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Express server!' });
});
router.get('/info', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Info from the server!' });
});
router.get('/index', async (req: Request, res: Response) => {
    const context = await fs.readFile('./public/index.html');
    res.status(200).send(context);
});
export default router;