const express = require('express');
const router = express.Router();
let students = require('../data/students');


router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: students
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const student = students.find((s) => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: 'Student Not Found'
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

router.post('/', (req, res) => {
  const { name, course } = req.body || {};

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request: Invalid input. Name and course are required.'
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'New Student Created',
    data: newStudent
  });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, course } = req.body || {};

  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student Not Found'
    });
  }

  if (!name || !course) {
    return res.status(400).json({
      success: false,
      message: 'Bad Request: Invalid input. Name and course are required.'
    });
  }

  students[studentIndex] = { id, name, course };

  res.status(200).json({
    success: true,
    message: 'Student records updated successfully',
    data: students[studentIndex]
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const studentIndex = students.findIndex((s) => s.id === id);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Student Not Found'
    });
  }

  const deletedStudent = students.splice(studentIndex, 1)[0];

  res.status(200).json({
    success: true,
    message: 'Student record removed successfully',
    data: deletedStudent
  });
});

module.exports = router;