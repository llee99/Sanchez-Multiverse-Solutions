import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = useSelector(state => state.auth);
    const { userInfo } = auth;

    const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    };

    return (
        <nav style={{ padding: '1rem', background: '#333', color: '#fff' }}>
        <Link to="/" style={{ marginRight: '1rem', color: '#fff' }}>Home</Link>
        <Link to="/about" style={{ marginRight: '1rem', color: '#fff' }}>About</Link>
        <Link to="/services" style={{ marginRight: '1rem', color: '#fff' }}>Services</Link>
        <Link to="/contact" style={{ marginRight: '1rem', color: '#fff' }}>Contact</Link>
    
        {userInfo ? (
        <>
            <Link to="/dashboard" style={{ marginRight: '1rem', color: '#fff' }}>Dashboard</Link>
            <button onClick={handleLogout} style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }}>
            Logout
            </button>
        </>
        ) : (
        <>
            <Link to="/login" style={{ marginRight: '1rem', color: '#fff' }}>Login</Link>
            <Link to="/register" style={{ color: '#fff' }}>Register</Link>
        </>
        )}
    </nav>
    );
}

export default Navbar;