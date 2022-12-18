import axios from "axios";
import { Storage } from "@ionic/storage";
import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { storageContext } from "./StorageContext";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const useStorage = () => {
  const { store, auth } = useContext(storageContext);
  return {
    store,
    auth,
  };
};

axios.defaults.withCredentials = true;

export const checkSession = async (token: string = "") => {
  const res = await axios.get(`${BASE_URL}/check-session`, { headers: { Authorization: `Bearer ${token}` } });
  return res.data;
};

export const authLogin = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/user/login`, {
    email: email,
    password: password,
  });
  return res.data;
};

export const authLogout = async (token: string = "") => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await axios.post(`${BASE_URL}/user/logout`, { test: "adaw" }, config);
  return res.data;
};

export const authRegister = async (data: FormData) => {
  const res = await axios.post(`${BASE_URL}/user/register`, data);
  return res.data;
};

export const authEdit = async (data: FormData) => {
  const res = await axios.post(`${BASE_URL}/user/edit`, data);
  return res.data;
};

export const circleCreate = async (
  token: string = "",
  circleName: string,
  address: string,
  desc: string,
  photo: File
) => {
  console.log("Photo: " + photo);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
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

export const joinCircle = async (token: string = "", name: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await axios.post(`${BASE_URL}/circle/join/`, { name: name }, config);
  return res.data;
};

export const getPackageByCircleId = async (token: string = "", id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${BASE_URL}/package/circle/${id}`, config);
  return res.data;
};

export const getPackageByUserId = async (token: string = "", id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${BASE_URL}/package/user/${id}`, config);
  return res.data;
};

export const getPackageById = async (token: string = "", id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${BASE_URL}/package/${id}`, config);
  return res.data;
};

export const getCircle = async (token: string = "", id: number) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.get(`${BASE_URL}/circle/${id}`, config);
  return res.data;
};

export const addPackage = async (token: string = "", data: FormData) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${BASE_URL}/package/create`, data, config);
  return res.data;
};

export const togglePackage = async (token: string = "", id: number, status: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res = await axios.post(`${BASE_URL}/package/toggle`, { packageId: id, status: status }, config);
  return res.data;
};

// export const addPackage = async (
//   token: string = "",
//   sender: string,
//   expedition: string,
//   receiptNumber: string,
//   roomNumber: string,
//   photo: string
// ) => {
//   console.log("Photo: " + photo);
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   };
//   const res = await axios.post(
//     `${BASE_URL}/package/create/`,
//     {
//       sender: sender,
//       expedition: expedition,
//       receiptNumber: receiptNumber,
//       roomNumber: roomNumber,
//       photoPath: await convertBase64ToBlob(photo),
//     },
//     config
//   );
//   return res.data;
// };

// export const convertBase64ToBlob = async (base64: string) => {
//   const res = await fetch(base64);
//   return res.blob();
// };
