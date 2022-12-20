import { createContext, useContext, useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import { checkSession, getCircle, getPackageByCircleId } from "./service";
import { useHistory } from "react-router";
import { Circle, PackageContainer } from "../types/type";

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
    photoPath: string;
    circle_id: number;
  };
  token: {
    type: string;
    value: string;
  };
};

type appDataTypes = {
  packages: PackageContainer;
  circle: Circle;
};

export const storageContext = createContext<any>({});

export const StorageProvider = (props: storageProviderTypes) => {
  const [store, setStore] = useState<Storage>();
  const [authData, setAuthData] = useState<authDataTypes | null>(null);
  const [appData, setAppData] = useState<appDataTypes | null>({} as appDataTypes);
  const history = useHistory();

  const initStorage = () => {
    const newStore = new Storage({
      name: "tiketdb",
    });

    Promise.all([newStore.create(), newStore.get("authData"), newStore.get("appData")]).then(async (res: any) => {
      const tempStore = res[0];
      const authData = res[1];
      const appData = res[2];

      setStore(tempStore);
      setAuthData(authData);
      setAppData(appData);
      console.log("Storage initialized");

      try {
        const res = await checkSession(authData?.token?.value);
        if (res.user.admin) {
          history.replace("/admin/home");
          console.log("admin");
        } else {
          history.replace("/user/home");
          console.log("user");
        }
      } catch (error: any) {
        console.log(error);
        setAuth({} as authDataTypes);
        history.replace("/login");
      }
    });
  };

  const takePackage = async () => {
    console.log("takePackage");
    try {
      let res = await getPackageByCircleId(authData!.token.value, authData!.user.circle_id);
      if (!authData!.user.admin) {
        res.packages = res.packages.filter((p: any) => p.user_id === authData!.user.id || p.status === "unknown");
      }
      const group = res.packages.reduce(
        (result: any, curr: any) => {
          result[curr.status] = [...(result[curr.status] || []), curr];
          return result;
        },
        { ongoing: [], finished: [], unknown: [] }
      );
      setAppData({ ...appData as appDataTypes, packages: group });
      await store?.set("appData", { ...appData as appDataTypes, packages: group });
    } catch (error: any) {
      console.log(error);
    }
  };

  const takeCircle = async () => {
    console.log("takeCircle");
    try {
      console.log(authData!.user.circle_id);
      const res = await getCircle(authData!.token.value, authData!.user.circle_id);
      setAppData({ ...appData as appDataTypes, circle: res.data });
      await store?.set("appData", { ...appData as appDataTypes, circle: res.data });
    } catch (error: any) {
      console.log(error);
    }
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
    app: {
      data: appData,
      handler: {
        takePackage: takePackage,
        takeCircle: takeCircle
      },
    },
  };

  return <storageContext.Provider value={defaultValue}>{props.children}</storageContext.Provider>;
};
