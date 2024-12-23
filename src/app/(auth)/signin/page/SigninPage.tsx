"use client";

import React from "react";
import { Row, Col } from "antd";
import Link from "next/link";
import { Button, Container, Text } from "@/components/atoms";
import Image from "next/image";
import { FormInput, FormWrapper } from "@/components/form";
import { SubmitHandler } from "react-hook-form";

export default function SigninPage() {
  const onSubmit: SubmitHandler<any> = async (data) => {
    console.log("Form Submitted: ", data);
  };

  return (
    <div className="bg-gray-50 w-full">
      <Row>
        {/* Left Section - Illustration */}
        <Col
          xs={24}
          lg={12}
          className="bg-[#2F7E79] w-full h-screen !flex justify-center items-center"
        >
          <Image
            alt="Mountains"
            src="/assets/images/login.png"
            width={0}
            height={0}
            sizes="80vw"
            style={{ width: "90%", height: "80%" }}
          />
        </Col>

        {/* Right Section - Sign-In Form */}
        <Col xs={24} lg={12} className="p-8 !flex flex-col justify-center">
          <Container>
            <div className="flex items-center justify-center">
              <Image
                src="/assets/images/logo.png"
                alt="Budget Buddy Tracker Logo"
                width={50}
                height={50}
              />
              <Text variant="h4" className="text-gray-800 ml-2">
                Budget Buddy Tracker
              </Text>
            </div>

            <div className="my-6 ">
              <Text variant="h2" className="text-gray-800 mt-4">
                Sign In
              </Text>
              <Text variant="p3" className="text-gray-500 mt-2">
                Welcome back! Log in to your account and start managing your
                budgets with ease.
              </Text>
            </div>

            <div className="mt-10">
              <FormWrapper onSubmit={onSubmit}>
                <FormInput name="email" label="Email" type="email" />
                <FormInput name="password" label="Password" type="password" />
                <Button
                  htmlType="submit"
                  customColor="primary"
                  className="w-full !h-[44px] hover:bg-primary-dark transition duration-300 mt-4"
                >
                  <Text className="text-white" variant="p3">
                    Sign In
                  </Text>
                </Button>
              </FormWrapper>
            </div>

            <div className="text-center mt-4">
              <Link href="/signup" className="!flex justify-center ">
                <Text variant="p4" className="text-gray-600">
                  Don’t have an account?{" "}
                  <span className="text-primary underline cursor-pointer">
                    Sign Up
                  </span>
                </Text>
              </Link>
            </div>
          </Container>
        </Col>
      </Row>
    </div>
  );
}
