import { useEffect, useState } from 'react';
import { api } from './services/api.js';
import CourseList from './components/CourseList.jsx';
import CourseDetails from './components/CourseDetails.jsx';
import './styles.css';

export default function App() {
  const [courses, setCourses] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  async function loadCourses(preferredId = selectedId) {
    const result = await api.getCourses();
    setCourses(result);
    const nextId = result.some((course) => course.id === preferredId) ? preferredId : result[0]?.id || null;
    setSelectedId(nextId);
    return nextId;
  }

  async function loadLessons(courseId) {
    setLessons(courseId ? await api.getLessons(courseId) : []);
  }

  useEffect(() => { loadCourses().catch((err) => setError(err.message)).finally(() => setLoading(false)); }, []);
  useEffect(() => { loadLessons(selectedId).catch((err) => setError(err.message)); }, [selectedId]);

  async function perform(action) {
    try { setError(''); await action(); } catch (err) { setError(err.message); }
  }

  const selectedCourse = courses.find((course) => course.id === selectedId);

  return <div className="app-shell">
    <CourseList courses={courses} selectedId={selectedId} onSelect={setSelectedId} onCreate={(data) => perform(async () => { const course = await api.createCourse(data); await loadCourses(course.id); })} onDelete={(id) => perform(async () => { await api.deleteCourse(id); await loadCourses(); })} />
    {error && <div className="error-banner" role="alert">{error}<button onClick={() => setError('')}>×</button></div>}
    {loading ? <main className="content centered"><div className="loader">Loading your courses...</div></main> : selectedCourse ? <CourseDetails course={selectedCourse} lessons={lessons} onAddLesson={(data) => perform(async () => { await api.createLesson(selectedId, data); await loadLessons(selectedId); await loadCourses(selectedId); })} onToggleLesson={(lesson) => perform(async () => { await api.updateLesson(lesson.id, { isCompleted: !lesson.isCompleted }); await loadLessons(selectedId); await loadCourses(selectedId); })} onDeleteLesson={(id) => perform(async () => { await api.deleteLesson(id); await loadLessons(selectedId); await loadCourses(selectedId); })} /> : <main className="content centered"><div className="empty-state"><span>+</span><h3>Start learning</h3><p>Create a course in the sidebar to begin tracking progress.</p></div></main>}
  </div>;
}