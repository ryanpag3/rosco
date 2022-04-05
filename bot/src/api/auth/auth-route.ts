import logger from '../../util/logger';
import * as AuthController from './auth-controller';

const AuthRoutes = [
    {
        method: 'GET',
        url: '/login',
        schema: {
            description: 'Login with Discord credentials.',
            response: {
                301: {}
            }
        },
        handler: AuthController.login
    },
    {
        method: 'GET',
        url: '/callback',
        schema: {
            description:  'Handle authorization callback from Discord.',
            response: {
                301: {}
            }
        },
        handler: AuthController.callback
    },
    {
        method: 'GET',
        url: '/test',
        schema: {
            description: 'test'
        },
        preHandler: [
            'verifyJWT'
        ],
        // @ts-ignore
        handler: (res, reply) => reply.send(200)
    }
];

export default AuthRoutes;