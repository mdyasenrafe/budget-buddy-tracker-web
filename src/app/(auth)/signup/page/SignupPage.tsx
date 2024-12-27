"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useFileUploadMutation } from "@/api/updloadApi";
import {
  TSignupPayload,
  addUser,
  useSignupMutation,
} from "@/redux/features/auth";
import { useAppDispatch } from "@/redux";
import { saveAccessToken } from "@/utils/auth";
import {
  SignupFooter,
  SignupForm,
  SignupHeader,
  SignupLayout,
} from "./components";

export type SignupFormFields = {
  name: string;
  email: string;
  password: string;
  photo: string;
};

export const SignupPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [imageUpload, { isLoading: imageLoading }] = useFileUploadMutation();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (data: SignupFormFields) => {
    try {
      if (data.photo) {
        const thumbRes = await imageUpload({ file: data.photo }).unwrap();

        if (thumbRes?.data?.url) {
          data.photo = thumbRes.data.url;
        } else {
          toast.error("Something went wrong! Please try again");
          return;
        }
      }

      const payload: TSignupPayload = {
        ...data,
        role: "user",
        status: "pending",
        source: "web",
      };

      const res = await signup(payload).unwrap();
      saveAccessToken(res.token as string);
      dispatch(addUser({ user: res.data, token: res.token as string }));
      toast.success(res?.message);
      router.push(redirect);
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to sign up. Please try again.");
    }
  };

  return (
    <SignupLayout>
      <SignupHeader />
      <SignupForm onSubmit={onSubmit} isLoading={isLoading || imageLoading} />
      <SignupFooter />
    </SignupLayout>
  );
};
