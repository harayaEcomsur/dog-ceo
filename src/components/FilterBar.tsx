import React, { useState, useEffect, useRef } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';

interface FilterBarProps {
    breeds: { [key: string]: string[] };
    onFilterChange: (breed: string, subBreed?: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ breeds, onFilterChange }) => {
    const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
    const [selectedSubBreed, setSelectedSubBreed] = useState<string | null>(null);
    const hasAppliedFilter = useRef<boolean>(false);

    useEffect(() => {
        if (selectedBreed && (!breeds[selectedBreed] || breeds[selectedBreed].length === 0)) {
            if (!hasAppliedFilter.current) {
                onFilterChange(selectedBreed);
                hasAppliedFilter.current = true;
            }
        } else {
            hasAppliedFilter.current = false;
        }
    }, [selectedBreed, breeds, onFilterChange]);

    const handleBreedChange = (event: React.SyntheticEvent, value: string | null) => {
        setSelectedBreed(value);
        setSelectedSubBreed(null);
        hasAppliedFilter.current = false;
    };

    const handleSubBreedChange = (event: React.SyntheticEvent, value: string | null) => {
        setSelectedSubBreed(value);
        if (selectedBreed && value) {
            onFilterChange(selectedBreed, value);
        }
    };

    return (
        <Box display="flex" gap={2} m={1}>
            <Autocomplete
                options={Object.keys(breeds)}
                renderInput={(params) => <TextField {...params} label="Raza" variant="outlined" />}
                onChange={handleBreedChange}
                value={selectedBreed}
                fullWidth
                
            />
            {selectedBreed && breeds[selectedBreed].length > 0 && (
                <Autocomplete
                    options={breeds[selectedBreed]}
                    renderInput={(params) => <TextField {...params} label="Sub Raza" variant="outlined" />}
                    onChange={handleSubBreedChange}
                    value={selectedSubBreed}
                    fullWidth
                />
            )}
        </Box>
    );
};

export default FilterBar;
