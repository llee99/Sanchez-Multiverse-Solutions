export const fetchServices = () => async (dispatch) => {
    dispatch({ type: 'SERVICES_REQUEST' });
    try {
        const response = await fetch('https://rickandmortyapi.com/api');
        console.log(response);
        if (!response.ok) {
            throw new Error(`Failed to fetch, status: ${response.status}`);
        }
        const data = await response.json();
        dispatch({ type: 'SERVICES_SUCCESS', payload: data });
    } catch (error) {
        dispatch({ type: 'SERVICES_FAILURE', payload: error.message });
    }
};