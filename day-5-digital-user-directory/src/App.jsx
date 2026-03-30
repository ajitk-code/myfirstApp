import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="main-header">
          <h1>Digital User Directory</h1>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:id" element={<UserProfile />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
