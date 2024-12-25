"use client";

import React from "react";
import { Row, Col } from "antd";
import Link from "next/link";
import { Button, Container, Text } from "@/components/atoms";
import Image from "next/image";
import { FormInput, FormUpload, FormWrapper } from "@/components/form";
import { SubmitHandler } from "react-hook-form";
import { signupSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFileUploadMutation } from "@/api/updloadApi";
import {
  TSignupPayload,
  addUser,
  useSignupMutation,
} from "@/redux/features/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch } from "@/redux";
import { toast } from "sonner";
import { saveAccessToken } from "@/utils/auth";

type SignupFormFields = {
  name: string;
  email: string;
  password: string;
  profile: string;
};

export const SignupPage = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [imageUpload, { isLoading: imageLoading }] = useFileUploadMutation();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit: SubmitHandler<SignupFormFields> = async (data) => {
    try {
      if (data.profile) {
        const thumbRes = await imageUpload({
          file: data.profile,
        }).unwrap();

        if (thumbRes?.data?.url) {
          data.profile = thumbRes.data.url;
        } else {
          toast.error("Something went wrong! Please try again");
          return;
        }
      }

      const payload: TSignupPayload = {
        ...data,
        role: "user",
        status: "pending",
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
    <div className="bg-gray-50 w-full">
      <Row>
        <Col
          xs={24}
          lg={12}
          className="bg-[#2F7E79] w-full min-h-screen  justify-center items-center !hidden lg:!flex"
        >
          <Image
            alt="Mountains"
            src="/assets/images/signup.png"
            width={0}
            height={0}
            sizes="80vw"
            style={{ width: "90%", height: "80%" }}
          />
        </Col>

        <Col xs={24} lg={12} className="py-8 !flex flex-col justify-center">
          <Container>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/logo.png"
                alt="Budget Buddy Tracker Logo"
                width={50}
                height={50}
              />
              <Text variant="h4" className="text-primary ml-2">
                Budget Buddy Tracker
              </Text>
            </div>

            <div className="my-6">
              <Text variant="h2" className="text-gray-800 mt-4">
                Sign Up
              </Text>
              <Text variant="p3" className="text-gray-500 mt-2">
                Create your account to track expenses, set budgets, and achieve
                your financial goals effortlessly.
              </Text>
            </div>

            <div>
              <FormWrapper
                onSubmit={onSubmit}
                resolver={zodResolver(signupSchema)}
              >
                <FormInput
                  name="name"
                  label="Name"
                  placeholder="Type your Name"
                />
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Type your Email"
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  placeholder="Type your Password"
                />
                <FormUpload name="profile" label="Upload profile picture" />
                <Button
                  htmlType="submit"
                  customColor="primary"
                  className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
                >
                  <Text className="text-white" variant="p3">
                    Sign Up
                  </Text>
                </Button>
              </FormWrapper>
            </div>

            <div className="text-center mt-4">
              <Link href="/signin" className="!flex justify-center">
                <Text variant="p4" className="text-gray-600">
                  Already have an account?{" "}
                  <span className="text-primary underline cursor-pointer">
                    Sign In
                  </span>
                </Text>
              </Link>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
