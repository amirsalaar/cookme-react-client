import { BASE_URL } from "../config";

export const User = {
    async create(params) {
        const res = await fetch(`${BASE_URL}/users`, {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user: params })
        })
        return await res.json();
    }
}
