'use client';

import React from 'react';
import FeedbackForm from '../../../components/FeedbackForm';

export default function FeedbackLanding() {
  return (
    <div style={{ background: '#0b0d14', color: '#e6e9f2', fontFamily: 'Inter, system-ui', minHeight: '100vh' }}>
      {/* Header */}
      <section style={{ padding: '60px 24px', textAlign: 'center', borderBottom: '1px solid #2a2e3d' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '40px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>
            Help Us Improve the Game
          </h1>
          <p style={{ fontSize: '16px', color: '#8c92a8', marginBottom: '24px', lineHeight: 1.6 }}>
            Thank you for playtesting! Your feedback is essential to making this the best NBA GM experience possible. Found a bug? Have a suggestion? Let us know below.
          </p>
        </div>
      </section>

      {/* Form */}
      <section style={{ padding: '60px 24px', background: '#14161f' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <FeedbackForm />
        </div>
      </section>

      {/* Tips */}
      <section style={{ padding: '60px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>Tips for Great Feedback</h2>
          <div style={{ display: 'grid', gap: '20px' }}>
            <div style={{ paddingLeft: '32px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, fontSize: '20px' }}>✓</span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Be Specific</h3>
              <p style={{ fontSize: '14px', color: '#8c92a8', margin: 0 }}>
                Instead of "this is broken," tell us exactly what happened and what you expected to happen.
              </p>
            </div>
            <div style={{ paddingLeft: '32px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, fontSize: '20px' }}>✓</span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Include Steps</h3>
              <p style={{ fontSize: '14px', color: '#8c92a8', margin: 0 }}>
                If you found a bug, write down the steps needed to reproduce it. This helps us fix it faster.
              </p>
            </div>
            <div style={{ paddingLeft: '32px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, fontSize: '20px' }}>✓</span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Small Feedback Helps</h3>
              <p style={{ fontSize: '14px', color: '#8c92a8', margin: 0 }}>
                UI typos, confusing text, balance issues—everything is useful. No feedback is too small.
              </p>
            </div>
            <div style={{ paddingLeft: '32px', position: 'relative' }}>
              <span style={{ position: 'absolute', left: 0, fontSize: '20px' }}>✓</span>
              <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>One Issue Per Report</h3>
              <p style={{ fontSize: '14px', color: '#8c92a8', margin: 0 }}>
                If you have multiple issues, submit them separately so we can track each one.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid #2a2e3d', color: '#5c627c', fontSize: '13px' }}>
        <p>Questions? Reply to your playtest email or reach out to us on Discord.</p>
      </footer>
    </div>
  );
}
