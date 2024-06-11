import React from 'react';
import { render, screen } from '@testing-library/react';
import ImageGallery from './ImageGallery';

const mockImages = [
    'https://images.dog.ceo/breeds/bulldog/n02096585_10347.jpg',
    'https://images.dog.ceo/breeds/retriever/n02099601_250.jpg',
];

test('renders images', () => {
    render(<ImageGallery images={mockImages} />);
    const images = screen.getAllByRole('img');
    expect(images.length).toBe(mockImages.length);
    images.forEach((img, index) => {
        expect(img).toHaveAttribute('src', mockImages[index]);
    });
});
