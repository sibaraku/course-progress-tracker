import { Router } from 'express';
import { deleteLesson, updateLesson } from '../controllers/lessonController.js';

const router = Router();
router.patch('/:id', updateLesson);
router.delete('/:id', deleteLesson);

export default router;