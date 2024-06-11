import React from 'react';
import { Grid, Card, CardMedia } from '@mui/material';

interface ImageGalleryProps {
    images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
    return (
        <Grid container spacing={2}>
            {images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                    <Card>
                        <CardMedia component="img" image={image} alt="dog" height="250"/>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageGallery;
