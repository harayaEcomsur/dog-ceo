import React from 'react';
import { Chip, Stack } from '@mui/material';

interface ActiveFiltersProps {
    filters: { breed: string; subBreed?: string }[];
    onRemoveFilter: (index: number) => void;
}

const ActiveFilters: React.FC<ActiveFiltersProps> = ({ filters, onRemoveFilter }) => {
    return (
        <Stack direction="row" spacing={1} m={1}>
            {filters.map((filter, index) => (
                <Chip
                    key={index}
                    label={filter.subBreed ? `${filter.breed} - ${filter.subBreed}` : filter.breed}
                    onDelete={() => onRemoveFilter(index)}
                />
            ))}
        </Stack>
    );
};

export default ActiveFilters;
