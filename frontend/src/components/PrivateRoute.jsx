import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const auth = useSelector(state => state.auth);
    const { userInfo } = auth;
    
    return userInfo ? children : <Navigate to="/login" />;
}

export default PrivateRoute;