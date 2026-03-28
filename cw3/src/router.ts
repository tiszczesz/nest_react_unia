import { Router, type Request,type Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { FileRepo } from './FileRepo.js';
const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToPublic = path.join(__dirname, '..', 'public');

console.log(pathToPublic);
// Define a simple route
router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Express server!' });
});
router.get('/info', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Info from the server!' });
});
router.get('/index', async (req: Request, res: Response) => {
    const context = await fs.readFile(path.join(pathToPublic, 'index.html'), 'utf-8');
    res.status(200).send(context);
});
router.get('/api/students', async (req: Request, res: Response) => {
   // wykorzystanie klasy FileRepo do pobrania ścieżki do pliku students.json
    const fileRepo = new FileRepo('students.json');
    console.log(fileRepo.getfile());

    const students = await fs.readFile(path.join(pathToPublic, 'students.json'), 'utf-8');
    res.status(200).json(JSON.parse(students));
});
export default router;