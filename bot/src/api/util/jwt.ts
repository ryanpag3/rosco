import jwt from 'jsonwebtoken';
import logger from '../../util/logger';

/**
 * Create a signed JWT token.
 * @param payload 
 */
export const create = (payload: any): string => {
    return jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: '1d'
    });
}

/**
 * Validate the provided JWT token and 
 */
export const validateJWT = (jwToken: string): any => {
    logger.trace(`jwt: ${jwToken}`);
    return jwt.verify(jwToken, process.env.JWT_SECRET as string);
}

