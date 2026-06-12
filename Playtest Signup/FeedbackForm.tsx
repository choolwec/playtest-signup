import React, { useState } from 'react';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    email: '',
    feedbackType: 'bug',
    title: '',
    description: '',
    severity: 'medium',
    steps: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const response = await fetch('/api/playtest-feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setStatus('success');
      setFormData({
        email: formData.email,
        feedbackType: 'bug',
        title: '',
        description: '',
        severity: 'medium',
        steps: '',
      });
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
          Your Email *
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
        <label htmlFor="feedbackType" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Type of Feedback *
        </label>
        <select
          id="feedbackType"
          name="feedbackType"
          value={formData.feedbackType}
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
          <option value="bug">🐛 Bug Report</option>
          <option value="suggestion">💡 Suggestion</option>
          <option value="balance">⚖️ Balance Issue</option>
          <option value="ui">🎨 UI/UX Feedback</option>
          <option value="other">📝 Other</option>
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Title *
        </label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Briefly describe the issue"
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
        <label htmlFor="description" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="What happened? What did you expect to happen?"
          rows={4}
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
            resize: 'vertical',
            transition: 'border-color 150ms ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#a855f7')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2e3d')}
        />
      </div>

      {formData.feedbackType === 'bug' && (
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="steps" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
            Steps to Reproduce
          </label>
          <textarea
            id="steps"
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            placeholder="1. Click this button&#10;2. Then do this&#10;3. Bug occurs"
            rows={3}
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
              resize: 'vertical',
              transition: 'border-color 150ms ease',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#a855f7')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#2a2e3d')}
          />
        </div>
      )}

      {formData.feedbackType === 'bug' && (
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="severity" style={{ display: 'block', marginBottom: '6px', color: '#e6e9f2', fontSize: '14px', fontWeight: 600 }}>
            Severity
          </label>
          <select
            id="severity"
            name="severity"
            value={formData.severity}
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
            <option value="low">Minor (cosmetic, doesn't affect gameplay)</option>
            <option value="medium">Moderate (affects gameplay but workaround exists)</option>
            <option value="high">Severe (major issue, no workaround)</option>
            <option value="critical">Critical (game-breaking, prevents progress)</option>
          </select>
        </div>
      )}

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
        {status === 'loading' ? 'Submitting…' : status === 'success' ? '✓ Thanks for the feedback!' : 'Submit Feedback'}
      </button>

      {status === 'error' && (
        <p style={{ color: '#fb6f6f', marginTop: '12px', fontSize: '13px' }}>
          {error}
        </p>
      )}
    </form>
  );
}
