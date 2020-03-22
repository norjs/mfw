import { NrAppElement } from "./NrAppElement.js";
import { WebComponentUtils } from "../../../../common/utils/WebComponentUtils";
import "./nr-app-styles.scss";

WebComponentUtils.defineElement(
    'nr-app',
    NrAppElement,
    {
        extends: 'div'
    }
);
