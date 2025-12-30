import React, { useState } from 'react';
  import { useNavigate, Link } from 'react-router-dom';
  import { useAuth } from '../context/AuthContext';

  function Login(){
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const { loginUser } = useAuth();
      const navigate = useNavigate();

      const handleSubmit = async (e) => {
          e.preventDefault();
          try{
              await loginUser({ email, password });
              navigate('/');
          } catch (err) {
              setError(err.response?.data?.message || 'Login Failed');
          }
      }

      return (
          <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Login</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
              <div>
                <label>Email:</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label>Password:</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit">Login</button>
            </form>

            <p>
              Don't you have account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        );
  }

  export default Login;
