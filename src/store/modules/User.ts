import {UserMutations} from "@/store/mutations-types.ts";
import {UserService} from "@/services/User.ts";
import {LocalStorageServiceInterface, UserServiceInterface} from "@/services/ports.ts";
import {LocalStorageService} from "@/services/LocalStorage.ts";

const userService: UserServiceInterface = UserService
const localStorageService: LocalStorageServiceInterface = LocalStorageService;
type StateType = {
    information: object | null
}
const state = (): StateType => ({
    information: localStorageService.getItem('UserInformation')
});

const getters = {
    marketplace(state: any) {
        return state.information?.store?.[0]?.marketplaceName
    },
    sellerId(state: any) {
        return state.information?.store?.[0]?.storeId
    }
}

const actions = {
    async fetchInformation(context: any) {
        const email = context.rootGetters['auth/email']
        if (email) {
            const response = await userService.information({email});
            if (response && response.Data) {
                context.commit(UserMutations.FETCH_INFORMATION, response.Data.user);
                localStorageService.setItem('UserInformation', response.Data.user);
            }
        }
    }
}

const mutations = {
    [UserMutations.FETCH_INFORMATION](state: any, payload: any) {
        state.information = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}