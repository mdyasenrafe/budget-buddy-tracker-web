"use client";

import { Text } from "@/components/atoms";
import Image from "next/image";
import { getCurrentUser } from "@/redux/features/auth";
import { useAppSelector } from "@/redux";
import { useEffect, useState } from "react";

export const HeaderContent: React.FC = () => {
  const currentUser = useAppSelector(getCurrentUser);

  // states
  const [isMounted, setIsMounted] = useState(false);

  // Lifecycle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      {isMounted && currentUser && (
        <Text variant="h5" className="!font-semibold hidden md:block">
          Welcome, {currentUser?.name}
        </Text>
      )}

      <div className="block md:hidden">
        <Image
          src="/assets/images/logo.png"
          alt="Budget Buddy Tracker Logo"
          width={50}
          height={50}
          priority
        />
      </div>
    </div>
  );
};
