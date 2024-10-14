import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { useSiteStore } from "@/store/site";
import { getLangList, getCurrencyList } from "@/assets/script/api/api";

export default defineNuxtMiddleware(({ app, $pinia, $cookies }) => {
    const siteStore = useSiteStore($pinia);
    siteStore.updateLang(app.i18n.locale as any);
    if (
        siteStore.langList.length === 0 ||
        siteStore.currencyList.length === 0
    ) {
        return Promise.all([getLangList(), getCurrencyList()]).then(
            ([res, res1]) => {
                if (res.statusCode === 0) {
                    siteStore.updateLangList(res.data);
                }
                if (res1.statusCode === 0) {
                    const currencyList = res1.data;
                    siteStore.updateCurrencyList(currencyList);
                    const localCurrency = $cookies.get("CurrencyCode");
                    if (localCurrency) {
                        siteStore.updateCurrency(localCurrency);
                    } else {
                        currencyList.some((item) => {
                            if (item.isDefault == 1) {
                                siteStore.updateCurrency(item.currencyCode);
                                return true;
                            }
                        });
                    }
                }
            }
        );
    }
});
