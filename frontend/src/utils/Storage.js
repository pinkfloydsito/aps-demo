export default class Storage {

    static get(key) {
        let value = localStorage.getItem(key);
        return value === null ? null : value;
    }

    static set(key,value) {
        return localStorage.setItem(key, value);
    }

    static unset(key) {
        if(this.isset(key))
            return localStorage.removeItem(key);
        else
            return null;
    }

    static clear() {
        return localStorage.clear();
    }

    static isset(key) {
        return this.get(key) !== null;
    }

}
