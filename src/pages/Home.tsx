import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useBreeds } from '../hooks/useDogAPI';
import FilterBar from '../components/FilterBar';
import ImageGallery from '../components/ImageGallery';
import ActiveFilters from '../components/ActiveFilters';
import { fetchBreedImages, fetchSubBreedImages } from '../utils/api';

interface Filter {
    breed: string;
    subBreed?: string;
}

const Home: React.FC = () => {
    const { breeds, loading, error } = useBreeds();
    const [filters, setFilters] = useState<Filter[]>([]);
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const loadImages = async () => {
            const allImages: string[] = [];
            for (const filter of filters) {
                const newImages = filter.subBreed
                    ? await fetchSubBreedImages(filter.breed, filter.subBreed)
                    : await fetchBreedImages(filter.breed);
                allImages.push(...newImages);
            }
            setImages(allImages);
        };

        loadImages();
    }, [filters]);

    const handleFilterChange = (breed: string, subBreed?: string) => {
        setFilters((prevFilters) => [...prevFilters, { breed, subBreed }]);
    };

    const handleRemoveFilter = (index: number) => {
        setFilters((prevFilters) => prevFilters.filter((_, i) => i !== index));
    };

    return (
        <Container>
            <Typography variant="h1" m={1} fontSize={48}>
                Dog-CEO
            </Typography>
            <FilterBar breeds={breeds} onFilterChange={handleFilterChange} />
            <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} />
            {loading ? (
                <></>
            ) : error ? (
                <Typography>Error: {error}</Typography>
            ) : (
                <ImageGallery images={images} />
            )}
        </Container>
    );
};

export default Home;
