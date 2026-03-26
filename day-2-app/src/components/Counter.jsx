import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount((prev) => (prev > 0 ? prev - 1 : 0));
  const reset = () => setCount(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Counter App</h3>
      <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Count: {count}</p>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
