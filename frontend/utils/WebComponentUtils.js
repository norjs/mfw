
export class WebComponentUtils {

    /**
     *
     * @param name {string}
     * @param controller {HTMLElement}
     */
    static defineElement (name, controller) {

        customElements.define(name, controller);

    }

}