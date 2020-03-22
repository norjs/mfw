import {NrHTMLElement} from "../NrHTMLElement.js";
import nrAppTemplate from "./nr-app-template.html";

export class NrAppElement extends NrHTMLElement {

    /**
     *
     */
    constructor() {

        super(nrAppTemplate);

        /**
         * @member {string|undefined}
         */
        this._src = undefined;

        this._updateSrcAttribute();

    }

    _render () {

        this._updateSrcAttribute();

        this._updateIframe();

        super._render();

    }

    _updateSrcAttribute () {

        if (this.hasAttribute('src')) {
            this._src = this.getAttribute('src');
        } else {
            this._src = "/views/loading";
        }

    }

    _updateIframe () {

        if (this._src) {

            const iframe = this.querySelector('iframe');

            iframe.src = this._src;

            console.info(`WOOT: ${this._src}`);

        }

    }

}
