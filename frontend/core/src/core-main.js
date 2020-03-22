import "./components/nrApp/nrAppComponent.js";

import coreConfig from "./core-config.json";
import TRANSLATIONS from "../../../translations/index.js";

import {FrontendService} from "../../common/services/FrontendService";
import {TranslationService} from "../../../common/services/TranslationService";

import "./core-styles.scss";

TranslationService.setTranslation("en", TRANSLATIONS.en);
TranslationService.setTranslation("fi", TRANSLATIONS.fi);
TranslationService.setLanguage("en");

FrontendService.setConfig("core", coreConfig);
