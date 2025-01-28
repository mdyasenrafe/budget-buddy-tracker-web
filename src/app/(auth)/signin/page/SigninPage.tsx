"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth";
import { useAppDispatch } from "@/redux";
import { addUser } from "@/redux/features/auth";
import {
  SigninFooter,
  SigninForm,
  SigninHeader,
  SigninLayout,
} from "./components";
import Cookies from "js-cookie";

export type SignInFormFields = {
  email: string;
  password: string;
};

export default function SigninPage() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const onSubmit = async (data: SignInFormFields) => {
    try {
      const res = await login(data).unwrap();
      Cookies.set("token", res.token as string, {
        path: "/",
        secure: true,
        sameSite: "Strict",
        expires: 365,
      });
      dispatch(addUser({ user: res.data, token: res.token as string }));
      toast.success(res?.message);
      router.push(redirect as string);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to login. Please try again.");
    }
  };

  return (
    <SigninLayout>
      <SigninHeader />
      <SigninForm onSubmit={onSubmit} isLoading={isLoading} />
      <SigninFooter />
    </SigninLayout>
  );
}
