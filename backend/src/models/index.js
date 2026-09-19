import Course from './Course.js';
import Lesson from './Lesson.js';

Course.hasMany(Lesson, {
  foreignKey: 'courseId',
  onDelete: 'CASCADE',
});
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

export { Course, Lesson };