import { Router, type Request, type Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { FileRepo } from './FileRepo.js';
import type { Student } from "./student.js";

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
    //console.log(fileRepo.getfile());
    const students = await fileRepo.getAllStudents();
    //console.log(students);
    res.status(200).json(students);
});
router.get('/api/students/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(400).json({ message: 'Invalid student ID' });
        return;
    }
    const fileRepo = new FileRepo('students.json');
    const student = await fileRepo.getStudentById(id);
    if (student) {
        res.status(200).json(student);
    } else {
        res.status(404).json({ message: 'Student not found' });
    }
});
router.post('/api/students', async (req: Request, res: Response) => {
    const { firstname, lastname } = req.body;
    const fileRepo = new FileRepo('students.json');
    const id = await fileRepo.getLastId() + 1;
    const newStudent: Student = {
        id,
        firstname,
        lastname,
        date: new Date()
    };
    await fileRepo.addStudent(newStudent);
    res.status(201).json(newStudent);
});

export default router;