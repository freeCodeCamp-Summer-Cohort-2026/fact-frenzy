// frontend/app/login/page.tsx
'use client';
import { useState } from 'react';
import api from '../../components/api';

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const testBackend = async () => {
    setLoading(true);
    try {
      // Ensure the backend is running on port 8000
      const response = await api.get('/'); 
      setMessage('Connection successful!');
      console.log('Response:', response.data);
    } catch (error: any) {
      console.error('API Error:', error);
      if (error.response) {
        // Server responded with error
        setMessage(`Error: ${error.response.status} - ${error.response.data.detail || 'Unknown error'}`);
      } else if (error.request) {
        // Request made but no response (likely CORS or server down)
        setMessage('Error: No response from server. Check CORS settings or if backend is running.');
      } else {
        setMessage('Error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={testBackend} disabled={loading}>
        {loading ? 'Testing...' : 'Test Backend Connection'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}