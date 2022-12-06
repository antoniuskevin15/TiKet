import axios from "axios";
import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useStorage = () => {
  const [store, setStore] = useState<Storage>();
  const [authData, setAuthData] = useState<any>();

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

export const authRegister = async (fullName: string, phoneNumber:string, email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/user/register`, { name: fullName, telephone:phoneNumber, email: email, password: password });
  return res.data;
};
