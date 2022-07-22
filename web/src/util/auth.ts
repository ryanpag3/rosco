import Cookies from './cookies'

/**
 * No need to do a deep check on this. If a user makes a request
 * and the call to Discord fails, we return a 401 and delete this.
 */
export const isLoggedIn = async () => {
    return document.cookie.indexOf(Cookies.IS_AUTHENTICATED) !== -1;
}