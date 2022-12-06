import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const authLogin = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/user/login`, { email: email, password: password });
  return res.data;
};
