"use client";

import React from "react";
import Link from "next/link";
import { Text } from "@/components/atoms";
import { navItems } from "@/utils";

export const BottomNavBar: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 bg-primary lg:hidden h-[80px] flex items-center justify-between flex-wrap w-full">
      {navItems.map(({ id, label, path, icon: Icon, desktop }) => (
        <Link href={path} key={id} className="mx-auto">
          <Icon className="text-2xl  mx-auto" color="white" />
        </Link>
      ))}
    </nav>
  );
};
