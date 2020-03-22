import _ from 'lodash';

/**
 *
 * @type {string|undefined}
 */
let CURRENT_LANG;

/**
 *
 * @type {Object.<string, Object.<string, string>>}
 */
let TRANSLATIONS = {};

/**
 *
 * @type {Function[]}
 */
let CALLBACKS = [];

export class TranslationService {

    /**
     *
     * @param lang {string}
     */
    static setLanguage (lang) {

        const translation = TRANSLATIONS[lang];

        if (translation === undefined) {
            throw new TypeError(`TranslationService.setLanguage("${lang}"): No translations found for language ${lang}`);
        }

        CURRENT_LANG = lang;

        this._callAllCallbacks(lang);

    }

    /**
     * @returns {string}
     */
    static getLanguage () {

        return CURRENT_LANG;

    }

    /**
     *
     * @param lang {string}
     * @param config {Object.<string, string>}
     */
    static setTranslation (lang, config) {

        TRANSLATIONS[lang] = config;

        this._callAllCallbacks(lang);

    }

    /**
     *
     * @param key {string}
     * @returns {*}
     */
    static translate (key) {

        if (CURRENT_LANG === undefined) {
            throw new TypeError(`TranslationService.translate("${key}"): No language set`);
        }

        const translation = TRANSLATIONS[CURRENT_LANG];

        if (translation === undefined) {
            throw new TypeError(`TranslationService.translate("${key}"): No translations found for language ${CURRENT_LANG}`);
        }

        return _.get(TRANSLATIONS[CURRENT_LANG], key) || key;

    }

    /**
     *
     * @param callback {Function}
     * @returns {Function} The destructor function
     */
    static onLanguageChange (callback) {

        CALLBACKS.push(callback);

        return () => this._removeCallback(callback);

    }

    /**
     *
     * @param lang {string}
     * @private
     */
    static _callAllCallbacks (lang) {

        _.forEach(
            CALLBACKS,
            clalback => this._callCallback(clalback, lang)
        );

    }

    /**
     *
     * @param callback {Function}
     * @param lang {string}
     * @private
     */
    static _callCallback (callback, lang) {

        try {
            callback(lang);
        } catch (e) {
            console.error(`ERROR in a callback for translation change: `, e);
        }

    }

    /**
     *
     * @param callback {Function}
     * @private
     */
    static _removeCallback (callback) {

        _.remove(CALLBACKS, c => c === callback);

    }

}