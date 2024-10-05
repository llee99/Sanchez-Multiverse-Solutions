import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const auth = useSelector(state => state.auth);
    const { userInfo, loading, error } = auth;
    
    const [form, setForm] = useState({ email: '', password: '' });
    
    useEffect(() => {
        if (userInfo) {
            navigate('/dashboard');
        }
    }, [userInfo, navigate]);
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(form));
    };
    
    return (
        <div>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label><br />
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label><br />
                <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;