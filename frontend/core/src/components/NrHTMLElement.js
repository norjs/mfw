
export class NrHTMLElement extends HTMLElement {

    /**
     *
     * @param template {string}
     */
    constructor (template = '') {

        super();

        this._initShadowRoot();
        this._setTemplateString(template);

    }

    /**
     *
     * @protected
     */
    _initShadowRoot () {

        this._shadowRoot = this.attachShadow({mode: 'open'});

    }

    /**
     *
     * @param template {string}
     * @protected
     */
    _setTemplateString (template) {

        this._shadowRoot.innerHTML = template;

    }

}
