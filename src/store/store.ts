import {createStore} from "vuex";
import analytics from "@/store/modules/Analytics.ts";
import auth from "@/store/modules/Auth.ts";
import user from "@/store/modules/User.ts";
export const store = createStore({
    modules: {
        analytics,
        auth,
        user
    },
})