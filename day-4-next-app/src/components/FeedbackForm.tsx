'use client'

import { useState } from 'react';
import { submitFeedback } from '../actions/feedback';

export default function FeedbackForm() {
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage] = useState('');

  async function handleAction(formData: FormData) {
    setIsPending(true);
    setMessage('');
    
    try {
      await submitFeedback(formData);
      setMessage('Feedback submitted successfully!');
      const form = document.getElementById('feedback-form') as HTMLFormElement;
      form?.reset();
    } catch (error) {
      setMessage('Failed to submit feedback.');
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form id="feedback-form" action={handleAction} className="flex flex-col gap-4 mb-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-2">Submit Feedback</h2>
      {message && (
        <div className={`p-3 rounded-md font-medium ${message.includes('success') ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
          {message}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className="block mb-1 font-medium">Name:</label>
        <input id="name" name="name" type="text" required className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600" />
      </div>
      
      <div>
        <label htmlFor="employeeId" className="block mb-1 font-medium">Employee ID:</label>
        <input id="employeeId" name="employeeId" type="text" required className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600" />
      </div>
      
      <div>
        <label htmlFor="feedback" className="block mb-1 font-medium">Feedback:</label>
        <textarea id="feedback" name="feedback" required className="w-full p-2 border border-gray-300 rounded-md min-h-[100px] dark:bg-gray-700 dark:border-gray-600" />
      </div>

      <button type="submit" disabled={isPending} className="mt-2 p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors">
        {isPending ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}
