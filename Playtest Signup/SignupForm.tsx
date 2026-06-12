import React, { useState } from 'react';

export default function SignupForm() {
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
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Email Address *
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="you@example.com"
          style={{
            width: '100%',
            padding: '12px 14px',
            background: '#14161f',
            border: `1px solid #2a2e3d`,
            color: '#e6e9f2',
            fontSize: '14px',
            borderRadius: '6px',
            fontFamily: 'Inter, system-ui',
            boxSizing: 'border-box',
            transition: 'border-color 150ms ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#a855f7')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2e3d')}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Your Name *
        </label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
          style={{
            width: '100%',
            padding: '12px 14px',
            background: '#14161f',
            border: `1px solid #2a2e3d`,
            color: '#e6e9f2',
            fontSize: '14px',
            borderRadius: '6px',
            fontFamily: 'Inter, system-ui',
            boxSizing: 'border-box',
            transition: 'border-color 150ms ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#a855f7')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2e3d')}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="experience" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Game Experience Level
        </label>
        <select
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '12px 14px',
            background: '#14161f',
            border: `1px solid #2a2e3d`,
            color: '#e6e9f2',
            fontSize: '14px',
            borderRadius: '6px',
            fontFamily: 'Inter, system-ui',
            boxSizing: 'border-box',
            cursor: 'pointer',
          }}
        >
          <option value="casual">Casual</option>
          <option value="intermediate">Intermediate</option>
          <option value="hardcore">Hardcore</option>
        </select>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label htmlFor="discord" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Discord Handle <span style={{ color: '#8c92a8' }}>(optional)</span>
        </label>
        <input
          id="discord"
          type="text"
          name="discord"
          value={formData.discord}
          onChange={handleChange}
          placeholder="username#1234"
          style={{
            width: '100%',
            padding: '12px 14px',
            background: '#14161f',
            border: `1px solid #2a2e3d`,
            color: '#e6e9f2',
            fontSize: '14px',
            borderRadius: '6px',
            fontFamily: 'Inter, system-ui',
            boxSizing: 'border-box',
            transition: 'border-color 150ms ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#a855f7')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2e3d')}
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          fontWeight: 600,
          background: status === 'success' ? '#34d399' : 'linear-gradient(135deg, #ec4899 0%, #a855f7 55%, #8b5cf6 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          opacity: status === 'loading' ? 0.6 : 1,
          boxShadow: status === 'success' ? 'none' : '0 0 16px rgba(168, 85, 247, 0.3)',
          transition: 'filter 150ms ease, box-shadow 150ms ease, opacity 150ms ease',
          fontFamily: 'Inter, system-ui',
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading' && status !== 'success') {
            e.currentTarget.style.filter = 'brightness(1.08)';
            e.currentTarget.style.boxShadow = '0 0 22px rgba(168, 85, 247, 0.45)';
          }
        }}
        onMouseLeave={(e) => {
          if (status !== 'loading' && status !== 'success') {
            e.currentTarget.style.filter = 'brightness(1)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(168, 85, 247, 0.3)';
          }
        }}
      >
        {status === 'loading' ? 'Submitting…' : status === 'success' ? '✓ Thanks for signing up!' : 'Join Playtest'}
      </button>

      {status === 'error' && (
        <p style={{ color: '#fb6f6f', marginTop: '12px', fontSize: '13px' }}>
          {error}
        </p>
      )}
    </form>
  );
}
