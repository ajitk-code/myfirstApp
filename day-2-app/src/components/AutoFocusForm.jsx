import { useRef, useEffect } from 'react';

export default function AutoFocusForm() {
  const focusInputRef = useRef(null);

  useEffect(() => {
    // Automatically focus the input element when the component mounts
    if (focusInputRef.current) {
      focusInputRef.current.focus();
    }
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px 0', borderRadius: '8px' }}>
      <h3>Auto-Focus Form</h3>
      <form onSubmit={(e) => e.preventDefault()}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>First Name (Auto-focused): </label>
          <input 
            type="text" 
            ref={focusInputRef} 
            placeholder="I capture focus on load!" 
            style={{ padding: '8px', width: '200px' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>Last Name: </label>
          <input 
            type="text" 
            placeholder="I am just a normal input" 
            style={{ padding: '8px', width: '200px' }}
          />
        </div>
      </form>
    </div>
  );
}
