import { useState } from 'react';
import { FeedbackForm } from './components/FeedbackForm';
import { FeedbackList } from './components/FeedbackList';
import { type Feedback } from './actions/feedback';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  const handleFeedbackAdded = (newFeedback: Feedback) => {
    setFeedbacks(prev => [newFeedback, ...prev]);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#1e293b' }}>Day 4 - Traditional React Form</h1>
        <p style={{ color: '#64748b' }}>A simple feedback system using local state</p>
      </header>
      
      <main>
        <FeedbackForm onFeedbackAdded={handleFeedbackAdded} />
        <FeedbackList feedbacks={feedbacks} />
      </main>
    </div>
  );
}

export default App;
