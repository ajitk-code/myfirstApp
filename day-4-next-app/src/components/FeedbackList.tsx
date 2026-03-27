import { getFeedbacks } from '../actions/feedback';
import { RefreshButton } from './RefreshButton';

export default async function FeedbackList() {
  const feedbacks = await getFeedbacks();

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Recent Feedback</h2>
        <RefreshButton />
      </div>
      {feedbacks.length === 0 ? (
        <p className="text-gray-500 italic">No feedback provided yet.</p>
      ) : (
        <ul className="space-y-4">
          {feedbacks.map((item) => (
            <li key={item.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <div className="font-bold text-lg">{item.name}</div>
              <div className="text-sm text-gray-500 mb-2">ID: {item.employeeId}</div>
              <p className="text-base">{item.feedback}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
