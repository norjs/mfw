import {NrHTMLElement} from "./NrHTMLElement.js";

export class NrFrameElement extends NrHTMLElement {

    /**
     *
     * @param template {string}
     * @param src {string|undefined}
     * @param iframeLocator {string}
     */
    constructor (
        template,
        src,
        iframeLocator = 'iframe'
    ) {

        super(template);

        /**
         * @member {string|undefined}
         * @protected
         */
        this._source = src;

        /**
         * @member {string|undefined}
         * @protected
         */
        this._iframeLocator = iframeLocator;

        this._updateSource();

        this._updateIframe();

    }

    /**
     * Returns the default source address for iframe element
     *
     * @returns {string}
     * @protected
     */
    _getDefaultViewName () {
        return "/views/loading";
    }

    /**
     * Set the source address for iframe element
     *
     * @param value
     * @protected
     */
    _setSource (value) {

        this._source = value;

        this._updateIframe();

    }

    /**
     * Returns the source address for iframe element
     *
     * @returns {string}
     * @protected
     */
    _getSource () {

        return this._source || this._getDefaultViewName();

    }

    /**
     * Called when things might have been changed.
     *
     * @protected
     */
    _render () {

        this._updateSource();

        super._render();

        this._updateIframe();

        this._updateStyles();

    }

    /**
     *
     * @protected
     */
    _updateSource () {

        const src = this._getSource();

        if (src !== this._source) {
            this._setSource(src);
        }

    }

    /**
     *
     * @private
     */
    _updateStyles () {

        if (` ${this.className} `.indexOf(` nr-app `) >= 0) {
            return;
        }

        console.log(`WOOT: className = `, this.className);

        if (this.className) {
            this.className = `${this.className} nr-app`;
        } else {
            this.className = 'nr-app';
        }

    }

    /**
     * Checks if the src element in the iframe DOM element is updated and update it if not.
     *
     * @protected
     */
    _updateIframe () {

        const iframe = this.querySelector(this._iframeLocator);

        if (!iframe) {
            //console.warn(`Warning! We don't have iframe yet.`);
            return;
        }

        const source = this._source;

        if (!source) {
            console.warn(`Warning! We don't have value for source to set in iframe yet.`);
            return;
        }

        if ( iframe.src !== source ) {
            iframe.src = source;
        }

    }

}
