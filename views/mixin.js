export default {
    beforeCreate() {
        const options = this.$options;
        if (options.api) {
            this.$api = options.api;
        } else if (options.parent && options.parent.$api) {
            this.$api = options.parent.$api;
        }

        let locale = this.$route.path.split('/', 2)[1];
        if (this.$i18n.locale !== locale && ['fa', 'en'].includes(locale)) {
            this.$i18n.locale = locale;
            this.$vuetify.rtl = ['fa', 'ar'].includes(locale);
        }
    },

    methods: {
        estimatedTime(d) {
            let h = Number(d) / 3600;
            return h < 1 ? h.toFixed(2) : this.abbreviateNumber(Math.floor(h));
        },
        duration(input) {
            try {
                return `${this.pad(Math.floor(input / 60))}:${this.pad(input % 60)}`;
            } catch (e) {
                return input;
            }
        },
        abbreviateNumber(value) {
            let newValue = value;
            if (value >= 1000) {
                let suffixes = ["", "K", "M", "B", "T"];
                let suffixNum = Math.floor(("" + value).length / 3);
                let shortValue = '';
                for (let precision = 2; precision >= 1; precision--) {
                    shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
                    let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                    if (dotLessShortValue.length <= 2) {
                        break;
                    }
                }
                if (shortValue % 1 !== 0) shortValue = shortValue.toFixed(1);
                newValue = shortValue + suffixes[suffixNum];
            }
            return newValue;
        },
        localePath(path) {
            if (this.$i18n.locale === 'en')
                return `/${path}`;
            return `/${this.$i18n.locale}/${path}`;
        }
    }
};
