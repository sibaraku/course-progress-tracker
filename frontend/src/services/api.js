const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'Request failed.');
  }
  return response.status === 204 ? null : response.json();
}

export const api = {
  getCourses: () => request('/courses'),
  createCourse: (data) => request('/courses', { method: 'POST', body: JSON.stringify(data) }),
  deleteCourse: (id) => request(`/courses/${id}`, { method: 'DELETE' }),
  getLessons: (courseId) => request(`/courses/${courseId}/lessons`),
  createLesson: (courseId, data) => request(`/courses/${courseId}/lessons`, { method: 'POST', body: JSON.stringify(data) }),
  updateLesson: (id, data) => request(`/lessons/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteLesson: (id) => request(`/lessons/${id}`, { method: 'DELETE' }),
};