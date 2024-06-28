import {OAuthTokenReqeustDto} from "@/services/ports.ts";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ref} from "vue";

export default function useAuth() {
    const store = useStore();
    const router = useRouter()
    const isLoading = ref(false);
    async function login(params: { Email: Email, Password: string }) {
        isLoading.value = true;
        const requestBody: OAuthTokenReqeustDto = {
            Email: params.Email,
            Password: params.Password,
            GrantType: "password",
            Scope: "amazon_data",
            ClientId: "C0001",
            ClientSecret: "SECRET0001",
            RedirectUri: "https://api.eva.guru" as AbsolutePath
        }
        await store.dispatch('auth/fetchToken', requestBody);
        await store.dispatch(`user/fetchInformation`, requestBody)
        router.push('/dashboard');
        isLoading.value = false;
    }

    return {login, isLoading}
}