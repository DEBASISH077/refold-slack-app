// src/pages/HealthPage.tsx
import { useEffect, useState } from 'react';
import api from '../api/api';

export default function HealthPage() {
  const [status, setStatus] = useState<string>('loading…');

  useEffect(() => {
    api.get('/health')
      .then(res => setStatus(res.data.status))
      .catch(() => setStatus('error'));
  }, []);

  return (
    <div>
      <h1>API Health Check</h1>
      <p>Status: <strong>{status}</strong></p>
    </div>
  );
}
