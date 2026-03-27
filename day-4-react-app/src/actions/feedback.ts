export interface Feedback {
  id: string;
  name: string;
  employeeId: string;
  feedback: string;
}

export const submitFeedback = async (data: Omit<Feedback, 'id'>): Promise<Feedback> => {
  return new Promise((resolve) => {
    // Simulate a network request
    setTimeout(() => {
      resolve({
        ...data,
        id: Math.random().toString(36).substring(7),
      });
    }, 500); 
  });
};
