import {NrFrameElement} from "../../../../common/classes/NrFrameElement.js";
import nrAppTemplate from "../../../../common/templates/nr-iframe-element-template.html";

export class NrAppElement extends NrFrameElement {

    /**
     *
     */
    constructor() {

        super(nrAppTemplate, this._getDefaultViewName());

    }

    /**
     *
     * @returns {string}
     * @private
     */
    _getSourceAttributeName () {
        return 'src';
    }

    /**
     *
     * @returns {string}
     * @protected
     */
    _getSource () {

        const srcName = this._getSourceAttributeName();

        if (this.hasAttribute(srcName)) {
            return this.getAttribute(srcName);
        }

        return super._getSource();

    }

}
