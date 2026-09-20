import { useState } from 'react';

export default function LessonForm({ onSubmit }) {
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
    <form className="lesson-form" onSubmit={handleSubmit}>
      <div><label>Lesson title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Add a lesson" /></label><label>Description<input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Optional detail" /></label></div>
      <button type="submit">Add lesson</button>
    </form>
  );
}