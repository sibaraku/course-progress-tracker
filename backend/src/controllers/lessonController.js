import { Course, Lesson } from '../models/index.js';

export async function listLessons(req, res, next) {
  try {
    const course = await Course.findByPk(req.params.courseId);
    if (!course) return res.status(404).json({ error: 'Course not found.' });
    const lessons = await Lesson.findAll({
      where: { courseId: req.params.courseId },
      order: [['createdAt', 'ASC']],
    });
    res.json(lessons);
  } catch (error) {
    next(error);
  }
}

export async function createLesson(req, res, next) {
  try {
    const title = typeof req.body.title === 'string' ? req.body.title.trim() : '';
    if (!title) return res.status(400).json({ error: 'Lesson title is required.' });
    const course = await Course.findByPk(req.params.courseId);
    if (!course) return res.status(404).json({ error: 'Course not found.' });
    if (req.body.isCompleted !== undefined && typeof req.body.isCompleted !== 'boolean') {
      return res.status(400).json({ error: 'isCompleted must be a boolean.' });
    }

    const lesson = await Lesson.create({
      courseId: course.id,
      title,
      description: typeof req.body.description === 'string' ? req.body.description.trim() : '',
      isCompleted: req.body.isCompleted ?? false,
    });
    res.status(201).json(lesson);
  } catch (error) {
    next(error);
  }
}

export async function updateLesson(req, res, next) {
  try {
    if (req.body.isCompleted !== undefined && typeof req.body.isCompleted !== 'boolean') {
      return res.status(400).json({ error: 'isCompleted must be a boolean.' });
    }
    const lesson = await Lesson.findByPk(req.params.id);
    if (!lesson) return res.status(404).json({ error: 'Lesson not found.' });
    const updates = {};
    if (req.body.title !== undefined) {
      if (typeof req.body.title !== 'string' || !req.body.title.trim()) {
        return res.status(400).json({ error: 'Lesson title is required.' });
      }
      updates.title = req.body.title.trim();
    }
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.isCompleted !== undefined) updates.isCompleted = req.body.isCompleted;
    await lesson.update(updates);
    res.json(lesson);
  } catch (error) {
    next(error);
  }
}

export async function deleteLesson(req, res, next) {
  try {
    const deleted = await Lesson.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Lesson not found.' });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}