import { AuthOptions, auth } from 'express-oauth2-jwt-bearer';
import config from '../scripts/env';

const authMiddleware = () => {
    const authOptions: AuthOptions = config['authOptions'];
    return auth(authOptions);
};

export { authMiddleware };
