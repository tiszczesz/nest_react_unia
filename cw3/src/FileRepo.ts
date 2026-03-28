import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
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
}