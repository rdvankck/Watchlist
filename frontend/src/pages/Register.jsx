import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';

function Register(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { registerUser } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim() || !email.trim() || !password.trim()) {
            toast.warning('Please fill in all fields');
            return;
        }

        if (password.length < 6) {
            toast.warning('Password must be at least 6 characters');
            return;
        }

        try{
            await registerUser({ username, email, password });
            toast.success('Registration successful! Welcome! 🎉');
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
            toast.error(err.response?.data?.message || 'Registration failed');
        }
    }
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center 
px-4">
            <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Create Account</h2>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-100 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Choose a username"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-white text-sm font-medium mb-2">Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400
focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                            placeholder="Create a password"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition 
duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-gray-300 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition duration-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

  export default Register;