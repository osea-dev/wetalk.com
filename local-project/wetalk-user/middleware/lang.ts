import { defineNuxtMiddleware } from "@nuxtjs/composition-api";
import { useSiteStore } from "@/store/site";
import { getCurrencyList } from "@/assets/script/api/api";

export default defineNuxtMiddleware(({ $cookies, app, $pinia }) => {
    const siteStore = useSiteStore($pinia);
    siteStore.updateLang(app.i18n.locale as any);

    const localCurrency = $cookies.get("CurrencyCode");
    if (localCurrency) {
        siteStore.updateCurrency(localCurrency);
    } else {
        return getCurrencyList().then((res) => {
            const currencyList = res.data;
            currencyList.some((item) => {
                if (item.isDefault == 1) {
                    siteStore.updateCurrency(item.currencyCode);
                    return true;
                }
            });
        });
    }
});
