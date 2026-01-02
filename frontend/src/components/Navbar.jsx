import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar(){

    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
        
    };
    
    return (
        <nav style={{backgroundColor: '#333', padding: '1rem', color:'white'}}>
            <div style={{display:'flex', justifyContent: 'space-between', alignItems:'center', maxWidth:'1200px', margin: '0 auto'}}>
                <div style={{display:'flex', alignItems:'center', gap: '1rem'}}>
                    <Link to="/" style={{color:'white', textDecoration:'none', fontSize:'1.5rem', fontWeight:'bold'}}>
                    MERN Watchlist
                    </Link>
                    {isAuthenticated && (
                        <> <Link to="/search" style={{color:'white', textDecoration:'none'}}>Search</Link>
                        <Link to="/watchlist" style={{color:'white',textDecoration:'none'}}>WatchList</Link>
                        </>
                    )}
                </div>
                <div style={{display:'flex', gap:'1rem'}}>
                    {!isAuthenticated ? (
                         <> <Link to="/login" style={{color:'white', textDecoration:'none'}}>login</Link>
                         <Link to="/register" style={{color:'white',textDecoration:'none'}}>Register</Link>
                         </>
                    ) : (
                        <button onClick={handleLogout} style={{padding:'0.5rem 1rem', backgroundColor:'#ff4444', color:'white', border:'none', cursor:'pointer'}}>Logout</button>

                    )}
                </div>
            </div>
        </nav>
    );
}
export default Navbar;