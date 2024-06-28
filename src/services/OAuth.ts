import http from "../shared/helper/http";
import {OAuthServiceInterface} from "./ports";

export const OAuthService: OAuthServiceInterface = {
    async token(body) {
        const response = await http.post('/oauth/token', body);
        if (response.status === 200) {
            return response.data;
        }
        return {}
    },
}