import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { fetchBreedImages, fetchSubBreedImages } from '../utils/api';
import { useBreeds } from '../hooks/useDogAPI';

jest.mock('../utils/api');
jest.mock('../hooks/useDogAPI');

const mockBreeds = { bulldog: ['english', 'french'], retriever: ['golden', 'labrador'] };

(useBreeds as jest.Mock).mockReturnValue({
    breeds: mockBreeds,
    loading: false,
    error: null,
});

test('renders filter bar and image gallery', () => {
    render(<Home />);
    expect(screen.getByLabelText('Raza')).toBeInTheDocument();
    expect(screen.getByLabelText('Sub Raza')).toBeInTheDocument();
});

test('fetches and displays images based on filters', async () => {
    const mockImages = ['https://images.dog.ceo/breeds/bulldog/n02096585_10347.jpg'];
    (fetchBreedImages as jest.Mock).mockResolvedValue(mockImages);

    render(<Home />);

    const breedInput = screen.getByLabelText('Raza');
    fireEvent.change(breedInput, { target: { value: 'bulldog' } });
    fireEvent.keyDown(breedInput, { key: 'Enter' });

    await waitFor(() => {
        expect(screen.getByRole('img')).toHaveAttribute('src', mockImages[0]);
    });
});
