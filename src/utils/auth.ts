"use server";

import { cookies } from "next/headers";

export const saveAccessToken = (token: string) => {
  cookies().set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
};

export const getAccessToken = (): string | undefined => {
  return cookies().get("accessToken")?.value;
};
