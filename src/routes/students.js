import { Router } from 'express';
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  updateStudentByIdController,
} from '../controllers/students.js';

const studentsRouter = Router();

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

studentsRouter.post('/students', createStudentController);

studentsRouter.patch('/students/:studentId', updateStudentByIdController);

studentsRouter.delete('/students/:studentId', deleteStudentByIdController);

export default studentsRouter;
