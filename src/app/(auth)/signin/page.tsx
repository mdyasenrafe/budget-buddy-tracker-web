import React, { Suspense } from "react";
import SigninPage from "./page/SigninPage";

export default function page() {
  return (
    <Suspense>
      <SigninPage />
    </Suspense>
  );
}
