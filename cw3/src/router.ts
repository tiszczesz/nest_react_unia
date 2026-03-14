import { Router, type Request,type Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToPublic = path.join(__dirname, '..', 'public', 'index.html');

console.log(pathToPublic);
// Define a simple route
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Express server!' });
});
router.get('/info', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Info from the server!' });
});
router.get('/index', async (req: Request, res: Response) => {
    const context = await fs.readFile(pathToPublic, 'utf-8');
    res.status(200).send(context);
});
export default router;