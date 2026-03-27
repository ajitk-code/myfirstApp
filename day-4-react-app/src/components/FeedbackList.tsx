import React from 'react';
import { type Feedback } from '../actions/feedback';

interface Props {
  feedbacks: Feedback[];
}

export const FeedbackList: React.FC<Props> = ({ feedbacks }) => {
  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Recent Feedback</h2>
      {feedbacks.length === 0 ? (
        <p style={{ color: '#64748b', fontStyle: 'italic' }}>No feedback provided yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {feedbacks.map((item) => (
            <li key={item.id} style={{ padding: '1rem', border: '1px solid #e2e8f0', marginBottom: '1rem', borderRadius: '8px', backgroundColor: '#f8fafc' }}>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.name}</div>
              <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.75rem' }}>ID: {item.employeeId}</div>
              <p style={{ margin: 0, lineHeight: '1.5' }}>{item.feedback}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
