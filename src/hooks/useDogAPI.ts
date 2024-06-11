import { useState, useEffect } from 'react';
import { fetchBreeds } from '../utils/api';

export const useBreeds = () => {
    const [breeds, setBreeds] = useState<{ [key: string]: string[] }>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadBreeds = async () => {
            try {
                const data = await fetchBreeds();
                setBreeds(data);
            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        loadBreeds();
    }, []);

    return { breeds, loading, error };
};
