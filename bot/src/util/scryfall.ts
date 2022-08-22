import Axios from 'axios'
import logger from './logger';

const axios = Axios.create({
    baseURL: 'https://api.scryfall.com'
});

/**
 * Get a list of available bundles that can be downloaded.
 * 
 * https://scryfall.com/docs/api/bulk-data/all for typings
 */
export const getBulkDataItems = async () => {
    const { data } = await axios.get('/bulk-data');

    return data;
}


/**
 * Download bulk data for a specific ID from getBulkDataItems
 */
export const getBulkData = async (bundleId: string) => {
    const bulkData = await axios.get(`/bulk-data/${bundleId}`);
    const largeJson = await axios.get(bulkData?.data?.download_uri);
    return largeJson.data;
}