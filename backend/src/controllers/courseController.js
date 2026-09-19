import { Course, Lesson } from '../models/index.js';

export async function listCourses(req, res, next) {
  try {
    const courses = await Course.findAll({
      include: [{ model: Lesson, attributes: ['id', 'isCompleted'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(courses);
  } catch (error) {
    next(error);
  }
}

export async function getCourse(req, res, next) {
  try {
    const course = await Course.findByPk(req.params.id, { include: Lesson });
    if (!course) return res.status(404).json({ error: 'Course not found.' });
    res.json(course);
  } catch (error) {
    next(error);
  }
}

export async function createCourse(req, res, next) {
  try {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) return res.status(400).json({ error: 'Course title is required.' });

    const course = await Course.create({
      title,
      description: typeof req.body.description === 'string' ? req.body.description.trim() : '',
    });
    res.status(201).json(course);
  } catch (error) {
    next(error);
  }
}

export async function deleteCourse(req, res, next) {
  try {
    const deleted = await Course.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Course not found.' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}