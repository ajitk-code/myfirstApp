import FeedbackForm from '@/components/FeedbackForm';
import FeedbackList from '@/components/FeedbackList';

export default function Home() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Day 4 - Next.js App Router Form</h1>
        <p className="text-gray-500 mt-2">Server Actions & Server Components</p>
      </header>
      
      <main>
        <FeedbackForm />
        <FeedbackList />
      </main>
    </div>
  );
}
