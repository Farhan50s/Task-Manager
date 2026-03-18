// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import Settings from './pages/Settings/Settings';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <div style={{ minHeight: '100vh', background: '#f8f7ff' }}>
          <Navbar />
          <main style={{ maxWidth: 760, margin: '0 auto', padding: '32px 16px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </TaskProvider>
    </BrowserRouter>
  );
}