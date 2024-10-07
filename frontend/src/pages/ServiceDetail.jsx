import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ServiceDetail() {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchService = async () => {
            try {
                const { data } = await axios.get(`/api/services/${id}`);
                setService(data);
                setLoading(false);
            } catch (err) {
                setError('Service not found');
                setLoading(false);
            }
        };
        fetchService();
    }, [id]);

    if (loading) return <p>Loading service...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
    <div>
        <h1>{service.title}</h1>
        <p>{service.description}</p>
        {/* adding more details */}
    </div>
    );
}

export default ServiceDetail;