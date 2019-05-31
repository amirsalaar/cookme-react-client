import { BASE_URL } from "../config";

const Session = {
  async create(params) {
    const res = await fetch(`${BASE_URL}/session`, {
      method: "POST",
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params)
    });
    return await res.json();
  },
  async destroy() {
    const res = await fetch(`${BASE_URL}/session`, {
      method: "DELETE",
      credentials: "include",
    });
    return await res.json();
  },
  async addToCart(params) {
    const res = await fetch(`${BASE_URL}/session/add_to_cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ order_details: params })
    });
    return await res.json();
  },
  async destroyCart() {
    const res = await fetch(`${BASE_URL}/session/destroy_cart`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return await res.json();
  },
}

export default Session;
