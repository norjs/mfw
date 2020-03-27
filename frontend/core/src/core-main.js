import "./components/index.js";
import "./core-styles.scss";
import coreConfig from "./core-config.json";
import TRANSLATIONS from "../../../translations/index.js";
import {FrontendService} from "../../common/services/FrontendService";
import {TranslationService} from "../../../common/services/TranslationService";
import {WebComponentUtils} from "../../common/utils/WebComponentUtils";

TranslationService.setTranslation("en", TRANSLATIONS.en);
TranslationService.setTranslation("fi", TRANSLATIONS.fi);
TranslationService.setLanguage("en");

FrontendService.setConfig("core", coreConfig);

_.forEach(Object.keys(coreConfig.components), tag => {
    const config = coreConfig.components[tag];
    WebComponentUtils.defineApp(tag, config);
});
