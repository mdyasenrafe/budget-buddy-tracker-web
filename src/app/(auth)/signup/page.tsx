import { Text } from "@/components/atoms";
import React, { Suspense } from "react";
import { SignupPage } from "./page/SignupPage";

export default function page() {
  return (
    <Suspense>
      <SignupPage />
    </Suspense>
  );
}
