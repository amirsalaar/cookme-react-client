import { BASE_URL } from "../config";

const Food = {
  async all() {
    const res = await fetch(`${BASE_URL}/foods`, {
      credentials: "include",
    });
    return await res.json()
  }
}

export default Food;
