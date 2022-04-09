const Cookies = {
    IS_AUTHENTICATED: 'ROSCOBOT_IS_AUTHENTICATED'
};

export function getCookie(name: string) {
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)')); 
    return match ? match[1] : null;
}

export default Cookies;