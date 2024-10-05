import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchServices } from '../redux/slices/serviceSlice';

function Services() {
    const dispatch = useDispatch();
    const servicesState = useSelector(state => state.services);
    const { services, loading, error } = servicesState;
    
    useEffect(() => {
        dispatch(fetchServices());
    }, [dispatch]);
    

    console.log('Services:', services); // Check what services contain

    if (loading) return <p>Loading services...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
  
    if (!Array.isArray(services)) {
      console.error('Services is not an array:', services); // Additional logging
      return <p>Failed to load services.</p>;
    }

    return (
        <div>
            <h1>Our Services</h1>
            {loading && <p>Loading services...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {services.map(service => (
                <li key={service._id}>
                <Link to={`/services/${service._id}`}>{service.title}</Link>
                </li>
                ))}
            </ul>
        </div>
    );
}

export default Services;