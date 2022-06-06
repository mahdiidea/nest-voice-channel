export default {
    set(key, val, exp_days = 60) {
        const date = new Date();
        date.setTime(date.getTime() + (exp_days * 24 * 60 * 60 * 1000));
        document.cookie = key + "=" + val + ";" + ("expires=" + date.toUTCString()) + ";path=/";
    },
    get(key, def = null) {
        try {
            let name = key + "=";
            let decodedCookie = decodeURIComponent(document.cookie);
            let ca = decodedCookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return def;
        } catch (ex) {
            return def;
        }
    }
}