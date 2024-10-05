import React from 'react';

function Footer() {
    return (
        <footer style={{ padding: '1rem', background: '#333', color: '#fff', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} Sanchez Multiverse Solutions. All rights reserved.</p>
        </footer>
    );
}

export default Footer;