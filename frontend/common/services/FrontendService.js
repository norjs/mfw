import _ from 'lodash';

let CALLBACKS = [];

let CONFIG = {};

/**
 * @FIXME Implement unit test
 * @FIXME Move callback setup to a reusable manager implementation
 */
export class FrontendService {

    /**
     *
     * @param key {string}
     * @param value {*}
     */
    static setConfig (key, value) {

        _.set(CONFIG, key, value);

        this._callAllCallbacks(key);

    }

    /**
     *
     * @param key {string}
     * @returns {*}
     */
    static getConfig (key) {
        return _.get(CONFIG, key);
    }

    /**
     *
     * @param key {string}
     * @param callback {Function}
     * @returns {Function}
     */
    static onConfigChange (key, callback) {

        CALLBACKS.push({key, callback});

        return () => this._removeCallback(key, callback);

    }

    /**
     *
     * @param key {string}
     * @param callback {Function}
     * @private
     */
    static _removeCallback (key, callback) {

        _.remove(CALLBACKS, (item) => item.key === key && item.callback === callback);

    }

    /**
     *
     * @param key {string}
     * @param callback {Function}
     * @private
     */
    static _callAllCallbacks (key, callback) {

        // FIXME: Improve so that changing "main" would not trigger also "mainapp" but would trigger "main.app"
        _.forEach(
            _.filter(CALLBACKS, item => _.startsWith(item.key, key)),
            item => this._callCallbackForKey(key, item.callback)
        );

    }

    /**
     *
     * @param key {string}
     * @param callback {Function}
     * @private
     */
    static _callCallbackForKey (key, callback) {

        try {
            callback();
        } catch (e) {
            console.error(`ERROR in callback for "${key}": `, e);
        }

    }

}