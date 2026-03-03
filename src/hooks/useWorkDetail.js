import { useState, useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from './baseUrl';

export const useWorkDetail = (id) => {
    const [workItem, setWorkItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError('No work ID provided');
            setLoading(false);
            return;
        }

        const fetchWorkDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`${baseUrl}/api/projects/${id}`);

                if (response.data.status) {
                    setWorkItem(response.data.data);
                } else {
                    setError(response.data.message || 'Failed to fetch work detail');
                }
            } catch (err) {
                console.error('Error fetching work detail:', err);
                setError(err.response?.data?.message || err.message || 'An error occurred while fetching work detail');
            } finally {
                setLoading(false);
            }
        };

        fetchWorkDetail();
    }, [id]);

    return { workItem, loading, error };
};