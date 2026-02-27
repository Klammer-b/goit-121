import createHttpError from 'http-errors';
import {
  DEFAULT_PAGE,
  DEFAULT_PER_PAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} from '../constants/getStudentsDefaultQueryParams.js';
import { Student } from '../db/models/student.js';
import { buildPaginationOptions } from '../helpers/paginationUtils.js';

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

  if (search) {
    studentsFilters.where({ $text: { $search: search } });
  }

  const students = await Student.find()
    .merge(studentsFilters)
    .skip(skip)
    .limit(perPage)
    .sort({
      [sortBy]: sortOrder,
    });

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

export const getStudentById = async (studentId) => {
  const student = await Student.findById(studentId);

  return student;
};

export const createStudent = async (payload) => {
  const student = await Student.create(payload);

  return student;
};

export const updateStudentById = async (studentId, payload) => {
  const student = await Student.findByIdAndUpdate(studentId, payload, {
    returnDocument: 'after',
  });

  return student;
};

export const deleteStudentById = async (studentId) => {
  await Student.findByIdAndDelete(studentId);
};
