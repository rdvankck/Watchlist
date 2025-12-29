import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Search from './pages/Search';
import Watchlist from './pages/Watchlist';
import Navbar from './components/Navbar';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Navbar/>

      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login/>} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register/>} />
      <Route path="/search" element={isAuthenticated ? <Search/> : <Navigate to="/login"/>} />
      <Route path="/watchlist" element={isAuthenticated ? <Watchlist/> : <Navigate to="/login" /> } />

      </Routes>
    </Router>
  );
  
}

export default App;
