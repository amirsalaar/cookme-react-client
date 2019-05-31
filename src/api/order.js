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
  async charge(token, orderID) {
    const res = await fetch(`${BASE_URL}/orders/${orderID}/payments`, {
      method: "POST",
      credentials: 'include',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({stripeToken: token})
    });
    return await res.json();
  },
}
