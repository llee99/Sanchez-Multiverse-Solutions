import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createService, deleteService, fetchServices, updateService } from '../redux/slices/serviceSlice';

function Dashboard() {
    const dispatch = useDispatch();
    
    const servicesState = useSelector(state => state.services);
    const { services, loading, error } = servicesState;
    
    const auth = useSelector(state => state.auth);
    const { userInfo } = auth;
    
    useEffect(() => {
        if (userInfo) {
            dispatch(fetchServices());
        }
    }, [dispatch, userInfo]);
    
    const handleAddService = () => {
        const title = prompt('Enter service title:');
        const description = prompt('Enter service description:');
        if (title && description) {
            dispatch(createService({ title, description }));
        }
    };
    
    const handleEditService = (service) => {
        const title = prompt('Edit service title:', service.title);
        const description = prompt('Edit service description:', service.description);
        if (title && description) {
            dispatch(updateService({ id: service._id, title, description }));
        }
    };
    
    const handleDeleteService = (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            dispatch(deleteService(id));
        }
    };
    
    return (
    <div>
        <h1>Dashboard</h1>
        <button onClick={handleAddService}>Add Service</button>
        {loading && <p>Loading services...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
            {services.map(service => (
                <li key={service._id}>
                <strong>{service.title}</strong> - {service.description}
                <button onClick={() => handleEditService(service)}>Edit</button>
                <button onClick={() => handleDeleteService(service._id)}>Delete</button>
                </li>
            ))}
        </ul>
    </div>
    );
}

export default Dashboard;