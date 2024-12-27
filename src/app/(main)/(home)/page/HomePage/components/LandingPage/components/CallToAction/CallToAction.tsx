"use client";

import React from "react";
import { Button, Text } from "@/components/atoms";
import Link from "next/link";
import { useAppSelector } from "@/redux";
import { getCurrentUser } from "@/redux/features/auth";
import { useRouter } from "next/navigation";

export const CallToAction = () => {
  const currentUser = useAppSelector(getCurrentUser);
  const router = useRouter();

  const handleButtonClick = () => {
    if (currentUser?._id) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  return (
    <div>
      <Button
        className="!px-8 !h-[44px] text-white !rounded-lg hover:bg-green-700 max-w-[456px] w-full"
        customColor="primary"
        onClick={handleButtonClick}
      >
        Get Started Now
      </Button>

      <div className="mt-6">
        <Text variant="body" className="text-gray-600">
          Already have an account?{" "}
          <Link href="/signin">
            <span className="text-green-600 underline hover:text-green-700 cursor-pointer">
              Log in
            </span>
          </Link>
        </Text>
      </div>
    </div>
  );
};
