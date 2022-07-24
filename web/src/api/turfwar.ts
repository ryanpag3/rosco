import axios from 'util/axios'

export const getGraph = async () => {
    const { data } = await axios.get('/turfwar');

    return data;
}

export const getCoordinates = async () => {
    const { data } = await axios.get('/turfwar/coordinates');

    return data;
}