import Vue from 'vue'
import VueI18n from 'vue-i18n';
import {ENGLISH_TRANSLATIONS} from "./lang/en-US";
import {PERSIAN_TRANSLATIONS} from "./lang/fa-IR";


Vue.use(VueI18n);

const TRANSLATIONS = {
    en: ENGLISH_TRANSLATIONS,
    fa: PERSIAN_TRANSLATIONS
};

export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages: TRANSLATIONS
});
