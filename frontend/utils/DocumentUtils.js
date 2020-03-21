
export class DocumentUtils {

    /**
     *
     * @param id {string}
     * @returns {HTMLElement}
     */
    static getElementById (id) {
        return document.getElementById(id);
    }

    /**
     *
     * @param htmlString {string}
     * @param containerName {string}
     * @returns {HTMLElement}
     */
    static createElementFromHTML (htmlString, containerName = 'div') {

        const container = document.createElement(containerName);

        container.innerHTML = htmlString.trim();

        return container;

    }

}
