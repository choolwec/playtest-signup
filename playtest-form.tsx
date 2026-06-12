import React, { useState } from 'react';

export default function PlaytestSignup() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    experience: 'casual',
    discord: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/playtest-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
      setFormData({ email: '', name: '', experience: 'casual', discord: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', fontFamily: 'system-ui' }}>
      <h1>Playtest Sign-Up</h1>
      <p>Help us find bugs and improve the game.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Email *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Name *
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="experience" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Game Experience Level
          </label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          >
            <option value="casual">Casual</option>
            <option value="intermediate">Intermediate</option>
            <option value="hardcore">Hardcore</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="discord" style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>
            Discord Handle
          </label>
          <input
            id="discord"
            type="text"
            name="discord"
            value={formData.discord}
            onChange={handleChange}
            placeholder="username#1234"
            style={{ width: '100%', padding: '8px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            background: status === 'success' ? '#22c55e' : '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
          }}
        >
          {status === 'loading' ? 'Submitting...' : status === 'success' ? '✓ Submitted!' : 'Submit'}
        </button>

        {status === 'error' && (
          <p style={{ color: '#ef4444', marginTop: '12px' }}>Error: {error}</p>
        )}
      </form>
    </div>
  );
}
