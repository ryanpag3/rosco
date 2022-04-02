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
    }
];

export default AuthRoutes;