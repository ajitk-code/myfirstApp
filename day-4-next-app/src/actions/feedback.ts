'use server'

import { revalidatePath } from 'next/cache';

export interface Feedback {
  id: string;
  name: string;
  employeeId: string;
  feedback: string;
  createdAt: number;
}

// In-memory array acting as our mock database
const feedbacks: Feedback[] = [];

export async function submitFeedback(formData: FormData) {
  const name = formData.get('name') as string;
  const employeeId = formData.get('employeeId') as string;
  const feedbackText = formData.get('feedback') as string;

  if (!name || !employeeId || !feedbackText) {
    throw new Error('All fields are required');
  }

  // Simulate a slight delay for realism
  await new Promise(resolve => setTimeout(resolve, 500));

  feedbacks.unshift({
    id: Math.random().toString(36).substring(7),
    name,
    employeeId,
    feedback: feedbackText,
    createdAt: Date.now(),
  });

  revalidatePath('/');
  return { success: true };
}

export async function getFeedbacks() {
  return feedbacks;
}
