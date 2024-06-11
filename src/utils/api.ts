import axios from 'axios';

const API_BASE_URL = 'https://dog.ceo/api';

export const fetchBreeds = async () => {
    const response = await axios.get(`${API_BASE_URL}/breeds/list/all`);
    return response.data.message;
};

export const fetchBreedImages = async (breed: string) => {
    const response = await axios.get(`${API_BASE_URL}/breed/${breed}/images`);
    return response.data.message;
};

export const fetchSubBreedImages = async (breed: string, subBreed: string) => {
    const response = await axios.get(`${API_BASE_URL}/breed/${breed}/${subBreed}/images`);
    return response.data.message;
};
