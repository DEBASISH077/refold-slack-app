// src/App.tsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import HealthPage from './pages/HealthPage';
import UsersPage from './pages/UsersPage';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ marginBottom: 20 }}>
        <NavLink to="/" style={{ marginRight: 10 }}>Health</NavLink>
        <NavLink to="/users">Users</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<HealthPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}
