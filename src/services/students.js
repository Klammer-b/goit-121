import createHttpError from 'http-errors';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} from '../constants/getStudentsDefaultQueryParams.js';
import { Student } from '../db/models/student.js';
import { buildPaginationOptions } from '../helpers/paginationUtils.js';
import { saveFile } from './file.js';

export const getStudents = async ({
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PER_PAGE,
  sortOrder = DEFAULT_SORT_ORDER,
  sortBy = DEFAULT_SORT_BY,
  filters = {},
  search,
}) => {
  const skip = (page - 1) * perPage;
  const studentsFilters = Student.find();
  if (filters.minAge) {
    studentsFilters.where('age').gte(filters.minAge);
  }

  if (filters.maxAge) {
    studentsFilters.where('age').lte(filters.maxAge);
  }

  if (filters.minAvgMark) {
    studentsFilters.where('avgMark').gte(filters.minAvgMark);
  }

  if (filters.maxAvgMark) {
    studentsFilters.where('avgMark').lte(filters.maxAvgMark);
  }

  if (filters.gender) {
    studentsFilters.where('gender').equals(filters.gender);
  }

  if (filters.onDuty !== undefined) {
    studentsFilters.where('onDuty').equals(filters.onDuty);
  }

  if (filters.userId) {
    studentsFilters.where('parent').equals(filters.userId);
  }

  if (search) {
    studentsFilters.where({ $text: { $search: search } });
  }

  const students = await Student.find()
    .merge(studentsFilters)
    .skip(skip)
    .limit(perPage)
    .sort({
      [sortBy]: sortOrder,
    })
    .populate('parent');

  const studentsCount = await Student.find()
    .merge(studentsFilters)
    .countDocuments();

  const paginationOptions = buildPaginationOptions(
    page,
    perPage,
    studentsCount,
  );

  if (page > paginationOptions.totalPages) {
    throw createHttpError(
      400,
      `Page exceeds maximum possible value: ${paginationOptions.totalPages}`,
    );
  }

  return {
    students,
    paginationOptions,
  };
};

export const getStudentById = async (studentId, parentId) => {
  const student = await Student.findOne({ _id: studentId, parent: parentId });

  return student;
};

export const createStudent = async ({ parentId, ...payload }) => {
  const student = await Student.create({ ...payload, parent: parentId });

  return student;
};

export const uploadStudentsAvatar = async (studentId, avatar) => {
  const student = await Student.findById(studentId);

  if (!student) return;

  const avatarUrl = await saveFile(avatar);

  student.avatarUrl = avatarUrl;

  await student.save();

  return student;
};

export const updateStudentById = async (studentId, parentId, payload) => {
  const student = await Student.findOneAndUpdate(
    { _id: studentId, parent: parentId },
    payload,
    {
      returnDocument: 'after',
    },
  );

  return student;
};

export const deleteStudentById = async (studentId, parentId) => {
  await Student.findOneAndDelete({ _id: studentId, parent: parentId });
};
