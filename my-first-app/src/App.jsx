import { useState } from 'react'
import Card from './components/Card'
import './App.css'

function App() {
  const name = "Ajit Kumar Kar";
  const fruits = ["Apple", "Banana", "Cherry"];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My AI Journey Begins</h1>
      <h2>Hello {name}</h2>

      <h3>My Favorite Fruits:</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <hr style={{ margin: '20px 0' }} />

      <h3>React Features:</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <Card
          title="Declarative"
          description="React makes it painless to create interactive UIs."
        />
        <Card
          title="Component-Based"
          description="Build encapsulated components that manage their own state."
        />
        <Card
          title="Learn Once, Write Anywhere"
          description="We don't make assumptions about the rest of your technology stack."
        />
      </div>
    </div>
  )
}

export default App
