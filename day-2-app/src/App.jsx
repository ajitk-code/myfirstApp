import { useState } from 'react'
import Card from './components/Card'
import Dashboard from './components/Dashboard'
import Counter from './components/Counter'
import SearchBar from './components/SearchBar'
import SecretMessage from './components/SecretMessage'
import TodoList from './components/TodoList'
import AutoFocusForm from './components/AutoFocusForm'
import './App.css'

function App() {
  const name = "Ajit Kumar Kar";
  const fruits = ["Apple", "Banana", "Cherry"];

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>My AI Journey Begins</h1>
      <h2>Hello {name}</h2>
      
      <h3>My Favorite Fruits:</h3>
      <ul>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>

      <hr style={{ margin: '20px 0' }} />
      
      <h3>React Features (Day 1):</h3>
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

      <hr style={{ margin: '40px 0', borderColor: '#eee', borderWidth: '2px' }} />
      
      <h2 style={{ color: '#0369a1' }}>Day 2 Exercises:</h2>
      <Dashboard />
      <Counter />
      <SearchBar />
      <SecretMessage />
      <TodoList />
      <AutoFocusForm />
    </div>
  )
}

export default App
