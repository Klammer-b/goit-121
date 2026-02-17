import { Student } from '../db/models/student.js';

export const getStudentsController = async (req, res) => {
  const students = await Student.find({});

  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await Student.findById(studentId);

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};
