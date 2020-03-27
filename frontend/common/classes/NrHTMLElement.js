
export class NrHTMLElement extends HTMLElement {

    /**
     *
     * @param template {string}
     */
    constructor (
        template = ''
    ) {

        super();

        /**
         *
         * @member {string}
         * @private
         */
        this._template = template;

    }

    destroy () {

    }

    /**
     *
     * @protected
     */
    connectedCallback() {

        this._setTemplateString(this._template);

        this._render();

    }

    /**
     *
     * @protected
     */
    disconnectedCallback() {

        this.destroy();

    }

    /**
     *
     * @protected
     */
    attributeChangedCallback(name, oldValue, newValue) {

        this._render();

    }

    /**
     *
     * @protected
     */
    adoptedCallback(name, oldValue, newValue) {

        this._render();

    }

    /**
     *
     * @protected
     */
    _render () {

        console.log(`RENDERED`);

    }

    /**
     *
     * @param template {string}
     * @protected
     */
    _setTemplateString (template) {

        this.innerHTML = template;

    }

}
