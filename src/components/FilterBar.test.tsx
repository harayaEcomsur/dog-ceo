import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import FilterBar from './FilterBar';

const mockBreeds = {
    bulldog: ['english', 'french'],
    retriever: ['golden', 'labrador'],
    beagle: [], // Añadimos una raza sin sub razas para pruebas
};

const mockOnFilterChange = jest.fn();

test('renders breed autocomplete', () => {
    render(<FilterBar breeds={mockBreeds} onFilterChange={mockOnFilterChange} />);
    const breedInput = screen.getByLabelText('Raza');
    expect(breedInput).toBeInTheDocument();
});

test('calls onFilterChange with selected breed without sub breeds', async () => {
    render(<FilterBar breeds={mockBreeds} onFilterChange={mockOnFilterChange} />);
    const breedInput = screen.getByLabelText('Raza');
    fireEvent.mouseDown(breedInput); // Open the dropdown
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('beagle'));
    expect(mockOnFilterChange).toHaveBeenCalledWith('beagle');
});

test('does not render sub breed autocomplete when breed has no sub breeds', () => {
    render(<FilterBar breeds={mockBreeds} onFilterChange={mockOnFilterChange} />);
    const breedInput = screen.getByLabelText('Raza');
    fireEvent.mouseDown(breedInput); // Open the dropdown
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('beagle'));
    expect(screen.queryByLabelText('Sub Raza')).not.toBeInTheDocument();
});

test('renders sub breed autocomplete when breed has sub breeds', () => {
    render(<FilterBar breeds={mockBreeds} onFilterChange={mockOnFilterChange} />);
    const breedInput = screen.getByLabelText('Raza');
    fireEvent.mouseDown(breedInput); // Open the dropdown
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('bulldog'));

    expect(screen.getByLabelText('Sub Raza')).toBeInTheDocument(); // Verificar que el autocomplete de sub razas se renderice
});

test('calls onFilterChange with selected sub breed', () => {
    render(<FilterBar breeds={mockBreeds} onFilterChange={mockOnFilterChange} />);
    const breedInput = screen.getByLabelText('Raza');
    fireEvent.mouseDown(breedInput); // Open the dropdown
    const listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('bulldog'));

    const subBreedInput = screen.getByLabelText('Sub Raza');
    fireEvent.mouseDown(subBreedInput); // Open the dropdown
    const subBreedListbox = within(screen.getByRole('listbox'));
    fireEvent.click(subBreedListbox.getByText('english'));

    expect(mockOnFilterChange).toHaveBeenCalledWith('bulldog', 'english');
});

test('resets sub breed when breed is changed', async () => {
    render(<FilterBar breeds={mockBreeds} onFilterChange={mockOnFilterChange} />);
    const breedInput = screen.getByLabelText('Raza');
    fireEvent.mouseDown(breedInput); // Open the dropdown
    let listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('bulldog'));

    let subBreedInput = screen.getByLabelText('Sub Raza');
    fireEvent.mouseDown(subBreedInput); // Open the dropdown
    let subBreedListbox = within(screen.getByRole('listbox'));
    fireEvent.click(subBreedListbox.getByText('english'));

    // Cambiar a una raza sin sub razas
    fireEvent.mouseDown(breedInput); // Open the dropdown again
    listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('beagle'));

    await waitFor(() => {
        expect(screen.queryByLabelText('Sub Raza')).not.toBeInTheDocument();
    });

    // Cambiar a una raza con sub razas
    fireEvent.mouseDown(breedInput); // Open the dropdown again
    listbox = within(screen.getByRole('listbox'));
    fireEvent.click(listbox.getByText('retriever'));

    await waitFor(() => {
        expect(screen.getByLabelText('Sub Raza')).toBeInTheDocument();
    });
});
