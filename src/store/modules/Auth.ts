import {AuthMutations} from "@/store/mutations-types.ts";
import {LocalStorageServiceInterface, OAuthServiceInterface, OAuthTokenReqeustDto} from "@/services/ports.ts";
import {OAuthService} from "@/services/OAuth.ts";
import {LocalStorageService} from "@/services/LocalStorage.ts";

const oAuthService: OAuthServiceInterface = OAuthService;
const localStorageService: LocalStorageServiceInterface = LocalStorageService;
const state = () => ({
    token: localStorageService.getItem('Token'),
    email: localStorageService.getItem('Email')
});

const getters = {
    token(state: any) {
        return state.token.AccessToken;
    },
    email(state: any) {
        return state.email;
    }
}

const actions = {
    async fetchToken(context: any, payload: OAuthTokenReqeustDto) {
        const response = await oAuthService.token(payload);
        if (response && response.Data) {
            context.commit(AuthMutations.FETCH_TOKEN, response.Data);
            context.commit(AuthMutations.SET_EMAIL, payload.Email);
            localStorageService.setItem('Email', payload.Email);
            localStorageService.setItem('Token', response.Data);
        }
    }
}

const mutations = {
    [AuthMutations.FETCH_TOKEN](state: any, payload: any) {
        state.token = payload
    },
    [AuthMutations.SET_EMAIL](state: any, payload: any) {
        state.email = payload
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}