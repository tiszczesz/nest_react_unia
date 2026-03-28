import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Student } from './student.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToPublic = path.join(__dirname, '..', 'public');
//Klasa do obsługi plików JSON
export class FileRepo {
    private filePath: string;
    constructor(fileName: string) {
        this.filePath = path.join(pathToPublic, fileName);
    }
    getfile(){
        return this.filePath;
    }
    getAllStudents = async (): Promise<Student[]> => {
        const data = await fs.readFile(this.filePath, 'utf-8');
        //parsowanie stringa z pliku do tablicy studentów i zwrócenie jej
        return JSON.parse(data);
    }
    getStudentById = async (id: number): Promise<Student | null> => {
        //pobranie wszystkich studentów z pliku
        const students = await this.getAllStudents();
        // i znalezienie studenta o podanym id lub null
        return students.find(student => student.id === id) || null;
    }
    saveStudents = async (students: Student[]): Promise<void> => {
        //z tablicy studentów tworzymy string w formacie JSON i zapisujemy do pliku
        const data = JSON.stringify(students, null, 2);
        await fs.writeFile(this.filePath, data, 'utf-8');
    }
    addStudent = async (student: Student): Promise<void> => {
        //pobranie wszystkich studentów, dodanie nowego do tablicy i zapisanie z powrotem do pliku
        const students = await this.getAllStudents();
        //dodanie nowego studenta do tablicy
        students.push(student);
        //zapisanie z powrotem do pliku
        await this.saveStudents(students);
    }
    getLastId = async (): Promise<number> => {
        const students = await this.getAllStudents();
        if (students.length === 0) {
            return 0;
        }
        //map tworzy tablicę z id studentów, 
        // ... operator rozbija tę tablicę na pojedyncze wartości,
        // a następnie Math.max zwraca największą wartość z tej tablicy   
        return Math.max(...students.map(s => s.id));
    }
    //napisac metodę deletestudentById(id: number): Promise<void> 
    // która usunie studenta o podanym id z pliku
    deleteStudentById = async (id: number): Promise<void> => {
        const students = await this.getAllStudents();
        //filtrowanie tablicy studentów, aby usunąć studenta o podanym id
        const updatedStudents = students.filter(student => student.id !== id);
        //zapisanie z powrotem do pliku
        await this.saveStudents(updatedStudents);   
    }
}