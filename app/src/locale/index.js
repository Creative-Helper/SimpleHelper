import { createI18n } from 'vue-i18n'
import es from '@/locale/es.json'
import ca from '@/locale/ca.json'
import en from '@/locale/en.json'

export function setI18nLanguage (i18n, locale) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }

  document.querySelector('html').setAttribute('lang', locale)
}

export function setupI18n (options = { locale: 'es' }) {
  const i18n = createI18n(options)
  setI18nLanguage(i18n, options.locale)
  return i18n
}

export const i18n = setupI18n({
  globalInjection: true,
  legacy: false,
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    es,
    ca,
    en
  }
})
