import { Router } from 'express';
import {
  createStudentController,
  deleteStudentByIdController,
  getStudentByIdController,
  getStudentsController,
  updateStudentByIdController,
} from '../controllers/students.js';
import { celebrate } from 'celebrate';
import { createStudentValidationSchema } from '../validation/createStudentValidationSchema.js';
import { studentIdValidationSchema } from '../validation/studentIdValidationSchema.js';
import { updateStudentValidationSchema } from '../validation/updateStudentValidationSchema.js';
import { VALIDATION_OPTIONS } from '../constants/validationOptions.js';

const studentsRouter = Router();

studentsRouter.use(
  '/students/:studentId',
  celebrate(studentIdValidationSchema),
);

studentsRouter.get('/students', getStudentsController);

studentsRouter.get('/students/:studentId', getStudentByIdController);

studentsRouter.post(
  '/students',
  celebrate(createStudentValidationSchema, VALIDATION_OPTIONS),
  createStudentController,
);

studentsRouter.patch(
  '/students/:studentId',
  celebrate(updateStudentValidationSchema, VALIDATION_OPTIONS),
  updateStudentByIdController,
);

studentsRouter.delete('/students/:studentId', deleteStudentByIdController);

export default studentsRouter;
