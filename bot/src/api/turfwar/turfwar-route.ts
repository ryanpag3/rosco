import * as TurfwarController from './turfwar-controller';

const TurfwarRoutes = [
    {
        method: 'GET',
        url: '/turf-war',
        schema: {
            description: 'Get the current turf war data.',
            response: {
                200: {}
            }
        },
        handler: TurfwarController.getGrid
    }
];

export default TurfwarRoutes;