import React, { useState } from 'react';
import { submitFeedback, type Feedback } from '../actions/feedback';

interface Props {
  onFeedbackAdded: (feedback: Feedback) => void;
}

export const FeedbackForm: React.FC<Props> = ({ onFeedbackAdded }) => {
  const [name, setName] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [feedback, setFeedback] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    
    try {
      const newFeedback = await submitFeedback({ name, employeeId, feedback });
      onFeedbackAdded(newFeedback);
      setSuccessMessage('Feedback submitted successfully!');
      setName('');
      setEmployeeId('');
      setFeedback('');
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', padding: '1.5rem', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
      <h2 style={{ margin: '0 0 1rem 0' }}>Submit Feedback</h2>
      {successMessage && <div style={{ color: '#15803d', fontWeight: 'bold', backgroundColor: '#dcfce7', padding: '0.75rem', borderRadius: '0.375rem', border: '1px solid #bbf7d0' }}>{successMessage}</div>}
      
      <div>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Name:</label>
        <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem' }} />
      </div>
      
      <div>
        <label htmlFor="employeeId" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Employee ID:</label>
        <input id="employeeId" type="text" value={employeeId} onChange={e => setEmployeeId(e.target.value)} required style={{ width: '100%', padding: '0.5rem', border: '1px solid #cbd5e1', borderRadius: '0.375rem' }} />
      </div>
      
      <div>
        <label htmlFor="feedback" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Feedback:</label>
        <textarea id="feedback" value={feedback} onChange={e => setFeedback(e.target.value)} required style={{ width: '100%', padding: '0.5rem', minHeight: '100px', border: '1px solid #cbd5e1', borderRadius: '0.375rem' }} />
      </div>

      <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: 'bold', marginTop: '0.5rem' }}>
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
};
