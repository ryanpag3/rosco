const AuthRoutes = [
    {
        method: 'GET',
        url: '/login',
        schema: {
            description: 'Login with Discord credentials.',
            response: {
                200: {
                    type: 'redirect',
                    description: 'Will redirect to Discord authentication portal.'
                }
            }
        }
    }
];

export default AuthRoutes;