import { createContext, useContext, useEffect, useState } from "react";
import { Storage } from "@ionic/storage";

type storageProviderTypes = {
  children: any;
};

type storageValueTypes = {
  store: {
    data: Storage;
    set: (store: Storage) => void;
  };
  auth: {
    data: authDataTypes;
    set: (data: authDataTypes) => void;
  };
};

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

export const storageContext = createContext<any>({});

export const StorageProvider = (props: storageProviderTypes) => {
  const [store, setStore] = useState<Storage>();
  const [authData, setAuthData] = useState<authDataTypes | null>(null);

  const initStorage = async () => {
    const newStore = new Storage({
      name: "tiketdb",
    });

    const tempStore = await newStore.create();
    const authData = await tempStore.get("authData");
    setStore(tempStore);
    setAuthData(authData);

    console.log("Storage initialized");
  };

  useEffect(() => {
    initStorage();
  }, []);

  const setAuth = async (data: authDataTypes) => {
    setAuthData(data);
    await store?.set("authData", data);
  };

  const defaultValue = {
    store: {
      data: store,
      set: (e: Storage) => setStore(e),
    },
    auth: {
      data: authData,
      set: (data: authDataTypes) => setAuth(data),
    },
  };

  return <storageContext.Provider value={defaultValue}>{props.children}</storageContext.Provider>;
};