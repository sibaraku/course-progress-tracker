import { Router } from 'express';
import { createCourse, deleteCourse, getCourse, listCourses } from '../controllers/courseController.js';
import { createLesson, listLessons } from '../controllers/lessonController.js';

const router = Router();

router.get('/', listCourses);
router.post('/', createCourse);
router.get('/:id', getCourse);
router.delete('/:id', deleteCourse);
router.get('/:courseId/lessons', listLessons);
router.post('/:courseId/lessons', createLesson);

export default router;