import axios from "axios";

const baseUrl = "/api/users";

export const getAll = async () => {
  return await axios.get(baseUrl);
};

export default { getAll };
