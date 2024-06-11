import { renderHook , waitFor } from '@testing-library/react';
import { useBreeds } from './useDogAPI';
import { fetchBreeds } from '../utils/api';

jest.mock('../utils/api');

test('fetches and sets breeds', async () => {
    const mockBreeds = { bulldog: ['english', 'french'], retriever: ['golden', 'labrador'] };
    (fetchBreeds as jest.Mock).mockResolvedValue(mockBreeds);

    const { result } = renderHook(() => useBreeds());

    expect(result.current.loading).toBe(true);
    await waitFor(() => result.current.loading === false);

    expect(result.current.breeds).toEqual(mockBreeds);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
});

test('handles fetch error', async () => {
    const mockError = 'Error fetching breeds';
    (fetchBreeds as jest.Mock).mockRejectedValue(new Error(mockError));

    const { result } = renderHook(() => useBreeds());

    await waitFor(() => result.current.loading === false);

    expect(result.current.error).toEqual(mockError);
    expect(result.current.loading).toBe(false);
});
