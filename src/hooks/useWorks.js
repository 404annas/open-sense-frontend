import { useState, useEffect } from 'react';
import axios from "axios";
import { baseUrl } from './baseUrl';

export const useWorks = ({ page = 1, limit = 6 }) => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(null);
    const [hasPrevPage, setHasPrevPage] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await axios.get(`${baseUrl}/api/projects?page=${page}&limit=${limit}`);
                setData(result.data);
                setError(null);
                setHasNextPage(result.data.data.pagination.hasNextPage)
                setHasPrevPage(result.data.data.pagination.hasPrevPage)
            } catch (err) {
                setError(err);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, limit]); // Add page and limit to dependency array so it re-fetches when they change

    return { data, loading, error, hasNextPage, hasPrevPage };
};
