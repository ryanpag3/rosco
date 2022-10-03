const RedisConfig = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT ? Number.parseInt(process.env.REDIS_PORT) : 6379
};

export default RedisConfig;