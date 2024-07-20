// i18n.js
import { createI18n } from "vue-i18n";

import id from "../tools/lang/id.json";
import en from "../tools/lang/en.json";

const messages = {
  en: en,
  id: id,
};

const savedLocale = localStorage.getItem("locale") || "en";

// Create i18n instance with options
const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  messages,
});

export default i18n;
