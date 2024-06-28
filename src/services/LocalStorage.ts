import {LocalStorageServiceInterface} from "./ports";

export const LocalStorageService: LocalStorageServiceInterface = {
    setItem(name, item) {
        return localStorage.setItem(name, JSON.stringify(item));
    },
    getItem<T>(name: string): T {
        const item = localStorage.getItem(name);
        if (item) {
            return JSON.parse(item)
        }
        return {} as T;
    },
}