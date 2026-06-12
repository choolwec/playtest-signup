'use client';

import React, { useState } from 'react';
import SignupForm from '../components/SignupForm';

export default function PlaytestLanding() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const benefits = [
    { title: 'Shape the Game', desc: 'Your feedback directly influences features and gameplay balance.' },
    { title: 'Early Access', desc: 'Be among the first to experience the game before launch.' },
    { title: 'Community', desc: 'Join a community of dedicated NBA GM simulation enthusiasts.' },
  ];

  const faqs = [
    {
      q: 'When does the playtest start?',
      a: 'We\'ll send download instructions and access details to all registered testers at the end of this week.',
    },
    {
      q: 'What do I need to do as a tester?',
      a: 'Play the game, explore features, and report any bugs or issues you find. You\'ll receive a feedback form after accessing the game.',
    },
    {
      q: 'How much time will it take?',
      a: 'You can spend as much or as little time as you\'d like. Even a few hours of feedback is invaluable.',
    },
    {
      q: 'Do I need any special equipment?',
      a: 'Just a computer with a modern web browser. The game runs on Windows, Mac, and Linux.',
    },
    {
      q: 'Can I report bugs?',
      a: 'Absolutely! Bug reports are one of the most helpful things you can provide. We\'ll have a dedicated feedback form for this.',
    },
  ];

  return (
    <div style={{ background: '#0b0d14', color: '#e6e9f2', fontFamily: 'Inter, system-ui', minHeight: '100vh' }}>
      {/* Hero */}
      <section style={{ padding: '80px 24px', textAlign: 'center', borderBottom: '1px solid #2a2e3d' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '16px', lineHeight: 1.2 }}>
            Help Us Build the Future of NBA GM
          </h1>
          <p style={{ fontSize: '18px', color: '#8c92a8', marginBottom: '32px', lineHeight: 1.6 }}>
            We're looking for passionate NBA fans to playtest our new dynasty simulation game. Your feedback will shape the final product.
          </p>
          <div style={{ display: 'inline-block', padding: '12px 24px', background: '#a855f7', borderRadius: '6px', fontSize: '14px', fontWeight: 600 }}>
            🎮 Closed Playtest • This Week
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '80px 24px', borderBottom: '1px solid #2a2e3d' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>Why Join?</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '24px',
            }}
          >
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                style={{
                  padding: '24px',
                  background: '#14161f',
                  border: '1px solid #2a2e3d',
                  borderRadius: '8px',
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{benefit.title}</h3>
                <p style={{ fontSize: '14px', color: '#8c92a8', margin: 0 }}>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section style={{ padding: '80px 24px', borderBottom: '1px solid #2a2e3d', background: '#14161f' }}>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>Join the Playtest</h2>
          <p style={{ fontSize: '14px', color: '#8c92a8', textAlign: 'center', marginBottom: '32px' }}>
            Sign up below. We'll email you download instructions and setup details by Friday.
          </p>
          <SignupForm />
        </div>
      </section>

      {/* FAQs */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid #2a2e3d',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    background: expandedFaq === idx ? '#1c1f2b' : '#14161f',
                    color: '#e6e9f2',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '15px',
                    fontWeight: 600,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {faq.q}
                  <span style={{ fontSize: '18px', transition: 'transform 200ms', transform: expandedFaq === idx ? 'rotate(180deg)' : 'rotate(0)' }}>
                    ▼
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div style={{ padding: '16px', background: '#1c1f2b', borderTop: '1px solid #2a2e3d', fontSize: '14px', color: '#8c92a8', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', textAlign: 'center', borderTop: '1px solid #2a2e3d', color: '#5c627c', fontSize: '13px' }}>
        <p>Questions? Reply to the email with your playtest access details.</p>
      </footer>
    </div>
  );
}
