import http from "../shared/helper/http";
import {UserServiceInterface} from "./ports";

export const UserService: UserServiceInterface = {
    async logout() {
        const response = await http.post('/user/logout');
        if (response.status === 200) {
            return response.data;
        }
        return false
    },
    async information(body) {
        const response = await http.post('/user/user-information', body);
        if (response.status === 200) {
            return response.data;
        }
        return false
    },
}