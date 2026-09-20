import LessonForm from './LessonForm.jsx';

export default function CourseDetails({ course, lessons, onAddLesson, onToggleLesson, onDeleteLesson }) {
  const completed = lessons.filter((lesson) => lesson.isCompleted).length;
  const progress = lessons.length === 0 ? 0 : Math.round((completed / lessons.length) * 100);

  return (
    <main className="content">
      <div className="content-header"><div><p className="eyebrow">Course overview</p><h1>{course.title}</h1><p className="description">{course.description || 'No description provided.'}</p></div><div className="progress-summary"><strong>{progress}%</strong><span>complete</span></div></div>
      <div className="progress-track" aria-label={`${progress}% complete`}><div style={{ width: `${progress}%` }} /></div>
      <div className="lesson-heading"><div><h2>Lessons</h2><p>{completed} of {lessons.length} completed</p></div><span className="lesson-count">{lessons.length}</span></div>
      <LessonForm onSubmit={onAddLesson} />
      {lessons.length === 0 ? <div className="empty-state"><span>○</span><h3>No lessons yet</h3><p>Add a lesson to start tracking this course.</p></div> : (
        <div className="lesson-list">{lessons.map((lesson, index) => (
          <article className={`lesson ${lesson.isCompleted ? 'completed' : ''}`} key={lesson.id}>
            <button className="check" aria-label={`Mark ${lesson.title} ${lesson.isCompleted ? 'incomplete' : 'complete'}`} onClick={() => onToggleLesson(lesson)}>{lesson.isCompleted ? '✓' : index + 1}</button>
            <div className="lesson-copy"><strong>{lesson.title}</strong>{lesson.description && <p>{lesson.description}</p>}</div>
            <button className="text-button danger" onClick={() => onDeleteLesson(lesson.id)}>Delete</button>
          </article>
        ))}</div>
      )}
    </main>
  );
}