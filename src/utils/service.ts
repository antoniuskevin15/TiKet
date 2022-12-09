import axios from "axios";
import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

type authDataTypes = {
  user: {
    id: number;
    name: string;
    telephone: string;
    email: string;
    admin: boolean;
    circle_id: number;
  };
  token: {
    type: string;
    value: string;
  };
};

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [authData, setAuthData] = useState<authDataTypes | null>(null);

  const initStorage = async () => {
    const newStore = new Storage({
      name: "tiketdb",
    });

    const store = await newStore.create();
    setStore(store);

    const authData = await store.get("authData");
    setAuthData(authData);
  };

  useEffect(() => {
    initStorage();
  }, []);

  const setAuth = async (data: any) => {
    setAuthData(data);
    await store?.set("authData", data);
  };

  return {
    store,
    auth: {
      data: authData,
      set: setAuth,
    },
  };
};

export const authLogin = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/user/login`, { email: email, password: password });
  return res.data;
};

export const authRegister = async (fullName: string, phoneNumber: string, email: string, password: string) => {
  console.log(`${BASE_URL}`);
  const res = await axios.post(`${BASE_URL}/user/register`, {
    name: fullName,
    telephone: phoneNumber,
    email: email,
    password: password,
  });
  return res.data;
};

export const circleCreate = async (token: string, circleName: string, address: string, desc: string, photo: File) => {
  console.log("Photo: "+photo);
  const config = {
    headers: { Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data' },
  };
  const formData = new FormData();
  formData.append("name", circleName);
  formData.append("address", address);
  formData.append("description", desc);
  formData.append("photo", photo);
  const res = await axios.post(
    `${BASE_URL}/circle/create/`,
    { name: circleName, address: address, description: desc, photo: photo },
    config
  );
  return res.data;
};

export const getPackageByCircleId = async (id: number) => {
  const res = await axios.get(`${BASE_URL}/package/circle/${id}`);
  return res.data;
};

export const getPackageByUserId = async (token:string, id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${BASE_URL}/package/user/${id}`, config);
  return res.data;
};

export const getCircle = async (token:string, id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${BASE_URL}/circle/${id}`, config);
  return res.data;
};