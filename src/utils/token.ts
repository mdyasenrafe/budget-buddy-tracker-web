"use client";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export const clearCookies = () => {
  const allCookies = Cookies.get();
  Object.keys(allCookies).forEach((cookieName) => {
    Cookies.remove(cookieName, { path: "/" });
  });
};
