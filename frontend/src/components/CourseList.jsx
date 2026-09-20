import CourseForm from './CourseForm.jsx';

export default function CourseList({ courses, selectedId, onSelect, onCreate, onDelete }) {
  return (
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">CP</span><div><strong>Course Progress</strong><small>Learning workspace</small></div></div>
      <CourseForm onSubmit={onCreate} />
      <div className="section-heading"><span>Your courses</span><span className="count">{courses.length}</span></div>
      {courses.length === 0 ? <p className="muted">No courses yet. Add your first one above.</p> : (
        <div className="course-list">
          {courses.map((course) => (
            <div className={`course-item ${selectedId === course.id ? 'selected' : ''}`} key={course.id}>
              <button className="course-select" onClick={() => onSelect(course.id)}>
                <strong>{course.title}</strong><span>{course.Lessons?.length || 0} lessons</span>
              </button>
              <button className="icon-button danger" aria-label={`Delete ${course.title}`} onClick={() => onDelete(course.id)}>×</button>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}