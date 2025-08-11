// src/components/CreateUserForm.tsx
import { useState, FormEvent } from 'react';
import api from '../api/api';

interface Props {
  onCreated: () => void;
}

export default function CreateUserForm({ onCreated }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await api.post('/users', { name });
      setName('');
      onCreated();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Unexpected error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:{' '}
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}
