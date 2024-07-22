import { useI18n } from "vue-i18n";
const locale = useI18n().locale;

export default {
  setLocale(lang) {
    locale.value = lang;
  },
};
