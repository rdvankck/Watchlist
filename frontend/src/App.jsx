import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Navbar from './components/Navbar';
import Stats from './pages/Stats';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <Navbar/>
          <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/watchlist" element={<Watchlist/>} />
          <Route path="/stats" element={<Stats/>} />
          </Routes>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
