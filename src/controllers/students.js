import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudentById,
} from '../services/students.js';

export const getStudentsController = async (req, res) => {
  const students = await getStudents();

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    return res.status(404).json({
      status: 404,
      message: 'NotFound',
      text: `Student with id ${studentId} not found!`,
    });
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

export const createStudentController = async (req, res) => {
  const student = await createStudent(req.body);

  res.status(201).send({
    status: 201,
    message: `Successfully created a student!`,
    data: student,
  });
};

export const updateStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await updateStudentById(studentId, req.body);

  res.send({
    status: 200,
    message: `Successfully update a student with id ${studentId}!`,
    data: student,
  });
};

export const deleteStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  await deleteStudentById(studentId);

  res.status(204).send();
};
