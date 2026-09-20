import { useState } from 'react';

export default function CourseForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) return;
    await onSubmit({ title, description });
    setTitle('');
    setDescription('');
  }

  return (
    <form className="stack-form" onSubmit={handleSubmit}>
      <label>Course title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. JavaScript basics" /></label>
      <label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What will this course cover?" rows="3" /></label>
      <button type="submit">Add course</button>
    </form>
  );
}