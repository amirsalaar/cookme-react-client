import { BASE_URL } from "../config";

export const Order = {
  async create(userID) {
    const res = await fetch(`${BASE_URL}/users/${userID}/orders`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'content-type': 'application/json'
      },
    })
    return await res.json();
  },
}
