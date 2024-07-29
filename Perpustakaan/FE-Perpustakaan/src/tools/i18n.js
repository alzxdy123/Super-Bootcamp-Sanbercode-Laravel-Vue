import { createI18n } from "vue-i18n";

function loadLocaleMessages() {
  const modules = import.meta.glob("./language/**/*.json", { eager: true });
  const messages = {};

  for (const path in modules) {
    const matched = path.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = modules[path].default;
    }
  }

  return messages;
}

const i18n = createI18n({
  legacy: false,
  locale: import.meta.env.VITE_I18N_LOCALE || "en",
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || "en",
  messages: loadLocaleMessages(),
});

export default i18n;
