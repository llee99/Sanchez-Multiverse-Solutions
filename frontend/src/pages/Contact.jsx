import React, { useState } from 'react';

function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    
    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // contact form submission logic
            // (like sending data to backend or use a service like EmailJS)
            setStatus('Message sent successfully!');
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            setStatus('Failed to send message.');
        }
    };
    
    return (
    <div>
        <h1>Contact Us</h1>
        {status && <p>{status}</p>}
        <form onSubmit={handleSubmit}>
        <div>
            <label>Name:</label><br />
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div>
            <label>Email:</label><br />
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
            <label>Message:</label><br />
            <textarea name="message" value={form.message} onChange={handleChange} required></textarea>
        </div>
        <button type="submit">Send</button>
        </form>
    </div>
    );
}

export default Contact;