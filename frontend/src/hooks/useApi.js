import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
// Base URL for the API - can be from .env
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
/**
 * Custom hook for making API requests.
 * @param config AxiosRequestConfig for the request.
 * @param initialData Optional initial data.
 * @returns State object with data, error, and loading status.
 */
function useApi(config, initialData = null) {
    const [data, setData] = useState(initialData);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await axios({ ...config, baseURL: API_BASE_URL });
            setData(result.data);
            setError(null);
        }
        catch (err) {
            setError(err);
            setData(null);
        }
        finally {
            setLoading(false);
        }
    }, [config]); // Dependencies: re-run if config changes
    useEffect(() => {
        // Optionally, you could make this hook fetch data immediately upon mount
        // by calling fetchData() here, or provide a function to trigger it manually.
        // For now, it's a placeholder that doesn't fetch on mount.
    }, [fetchData]);
    // It might be more useful to return a function to manually trigger the fetch
    // e.g., return { data, error, loading, request: fetchData };
    return { data, error, loading, request: fetchData };
}
export default useApi;
/**
 * Example Usage (conceptual):
 *
 * in YourComponent.tsx:
 * const { data: users, loading, error, request: fetchUsers } = useApi<User[]>({ url: '/users', method: 'GET' });
 *
 * useEffect(() => {
 *   fetchUsers();
 * }, [fetchUsers]);
 *
 * if (loading) return <p>Loading users...</p>;
 * if (error) return <p>Error fetching users: {error.message}</p>;
 * if (!users) return <p>No users found.</p>;
 *
 * return (
 *   <ul>
 *     {users.map(user => <li key={user.id}>{user.name}</li>)}
 *   </ul>
 * );
 */ 
