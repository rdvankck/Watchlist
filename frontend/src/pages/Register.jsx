import React, { useState } from 'react';
  import { useNavigate, Link } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';

  function Register(){
      const [username, setUsername] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const { registerUser } = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
          e.preventDefault();
          try{
              await registerUser({ username, email, password });
              navigate('/');
          } catch (err) {
              setError(err.response?.data?.message || 'Registration failed');
          }
      }

      return (
          <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Register</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label>Username:</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Password:</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>

              <button type="submit" style={{ padding: '0.5rem 1rem' }}>Register</button>
            </form>

            <p>
              Already have account? <Link to="/login">Login</Link>
            </p>
          </div>
        );
  }

  export default Register;