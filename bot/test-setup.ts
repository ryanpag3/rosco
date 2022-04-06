require('dotenv').config({
    path: '.env.test'
});
import redis from 'redis-mock';

jest.mock('./src/util/prisma.ts');
jest.mock('redis', () => redis);

export default {}