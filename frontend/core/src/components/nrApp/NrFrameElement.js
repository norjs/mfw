import {NrHTMLElement} from "../NrHTMLElement.js";

export class NrFrameElement extends NrHTMLElement {

    /**
     *
     * @param template {string}
     * @param src {string|undefined}
     */
    constructor (template, src, iframeLocator = 'iframe') {

        super(template);

        /**
         * @member {string|undefined}
         * @protected
         */
        this._source = src;

        this._updateSource();

    }

    /**
     *
     * @returns {string}
     * @protected
     */
    _getDefaultViewName () {
        return "/views/loading";
    }

    /**
     *
     * @param value
     * @protected
     */
    _setSource (value) {

        this._source = value;

        this._updateIframe();

    }

    /**
     *
     * @protected
     */
    _render () {

        this._updateSource();

        super._render();

    }

    /**
     *
     * @returns {string}
     * @protected
     */
    _getSource () {

        return this._source || this._getDefaultViewName();

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
     * @protected
     */
    _updateIframe () {

        if (this._source) {

            const iframe = this.querySelector('iframe');

            iframe.src = this._source;

        }

    }

}
