import { BASE_URL } from "../config";

export const User = {
  async current() {
    const res = await fetch(`${BASE_URL}/users/current`, {
      credentials: "include",
    });
    return await res.json();
  },
  async cart(id) {
    const res = await fetch(`${BASE_URL}/users/${id}/cart`, {
      credentials: "include"
    });
    return await res.json();
  },
  // async create(params) {
  //   const res = await fetch(`${BASE_URL}/users`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ user: params })
  //   })
  //   return await res.json();
  // },
  async create(formData) {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      credentials: "include",
      body: formData
    })
    return await res.json();
  },
}
