import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import ForgotPassword from "./pages/auth/ForgotPassword";
import RequestAccessPage from './pages/auth/RequestAccessForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/requestTrial" element={<RequestAccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;