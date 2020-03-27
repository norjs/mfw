import nrIframeElementTemplate from "../templates/nr-iframe-element-template.html";
import {NrFrameElement} from "../classes/NrFrameElement";

/**
 * @typedef {Object} NrAppConfigObject
 * @property {string} href -- The location for the app
 */

/**
 *
 */
export class WebComponentUtils {

    /**
     * Defines custom tag using a class extended from HTMLElement as a controller
     *
     * @param name {string} The HTML tag name
     * @param element {typeof HTMLElement}
     */
    static defineElement (name, element) {

        customElements.define(name, element);

    }

    /**
     * Defines a custom tag using an app in another location
     *
     * @param name {string} The HTML tag name
     * @param config {NrAppConfigObject}
     */
    static defineApp (name, config) {

        const href = config.href;

        class CustomElement extends NrFrameElement {

            constructor () {
                super(nrIframeElementTemplate, href);
            }

        }

        WebComponentUtils.defineElement(name, CustomElement);

    }

}