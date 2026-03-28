import { Injectable } from '@nestjs/common';

@Injectable()
export class StudentService {
  student = {
    name: 'Jan',
    surname: 'Kowalski',
  };
  getStudent() {
    return this.student;
  }
}
