import { fastify } from '..';
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
        url: '/logout',
        schema: {
            description: 'Logout of the application.'
        },
        preHandler: (fastify as any).auth([
            (fastify as any).verifyJWT
        ]),
        handler: AuthController.logout
    }
];

export default AuthRoutes;