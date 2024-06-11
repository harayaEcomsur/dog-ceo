import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ActiveFilters from './ActiveFilters';

const mockFilters = [
    { breed: 'bulldog', subBreed: 'english' },
    { breed: 'retriever', subBreed: 'golden' },
];

const mockOnRemoveFilter = jest.fn();

test('renders active filters', () => {
    render(<ActiveFilters filters={mockFilters} onRemoveFilter={mockOnRemoveFilter} />);
    const chips = screen.getAllByRole('button');
    expect(chips.length).toBe(mockFilters.length);
    mockFilters.forEach((filter, index) => {
        expect(chips[index]).toHaveTextContent(`${filter.breed} - ${filter.subBreed}`);
    });
});

test('calls onRemoveFilter when chip delete is clicked', () => {
    render(<ActiveFilters filters={mockFilters} onRemoveFilter={mockOnRemoveFilter} />);
    
    const deleteButtons = screen.getAllByTestId('CancelIcon');
    fireEvent.click(deleteButtons[0]);
    expect(mockOnRemoveFilter).toHaveBeenCalledWith(0);
});
