import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/authSlice';

function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const auth = useSelector(state => state.auth);
    const { userInfo, loading, error } = auth;
    
    const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [passwordMatch, setPasswordMatch] = useState(true);
    
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
        if (form.password !== form.confirmPassword) {
            setPasswordMatch(false);
            return;
        }
        setPasswordMatch(true);
        dispatch(register({ name: form.name, email: form.email, password: form.password }));
    };
    
    return (
        <div>
            <h1>Register</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match</p>}
            {loading && <p>Loading...</p>}
            <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label><br />
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label><br />
            <   input type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Password:</label><br />
                <input type="password" name="password" value={form.password} onChange={handleChange} required />
            </div>
            <div>
                <label>Confirm Password:</label><br />
                <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
            </div>
            <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;