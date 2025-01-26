"use client";

import { Button, Text } from "@/components/atoms";
import { useModal } from "@/hooks";
import { useAppDispatch, useAppSelector } from "@/redux";
import { getCurrentUser, logout } from "@/redux/features/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { LogoutModal } from "./components";
import { LuCirclePlus } from "react-icons/lu";
import { clearCookies, navItems } from "@/utils";
import { useGetCardOverviewQuery } from "@/redux/features/cardOverview";
import { CardModal } from "@/components/molecules/modals";
import { useFetchCategoriesQuery } from "@/redux/features/category";

export const LeftSideBar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isCardModalOpen, setCardModalOpen] = useState(false);

  // hooks
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentUser = useAppSelector(getCurrentUser);
  const { isModalOpen, openModal, closeModal } = useModal();

  // Fetch card overview data
  const { data: cardOverview, isLoading } = useGetCardOverviewQuery();
  const { data, isLoading: categoryLoading, error } = useFetchCategoriesQuery();

  const handleLogout = () => {
    dispatch(logout());
    closeModal();
    clearCookies();
  };

  useEffect(() => {
    setIsMounted(true);

    if (!isLoading && !cardOverview?.data) {
      setCardModalOpen(true);
    }
  }, [isMounted, cardOverview, isLoading]);

  return (
    <aside className="h-screen w-full bg-primary text-center pt-8 !sticky overflow-y-hidden top-0 p-4">
      <nav>
        <Link href={"/"} className="justify-center flex mb-4">
          <Image src="/assets/images/logo.png" width={40} height={40} alt="" />
        </Link>
        <div className="space-y-3">
          {navItems.map(
            ({ id, label, path, icon: Icon, desktop }) =>
              desktop && (
                <div
                  key={id}
                  className="flex items-center space-x-2 rounded-full cursor-pointer p-3 transition-transform transform hover:scale-105 hover:bg-white/10"
                >
                  <Link href={path} className="flex items-center">
                    <Icon className="text-2xl" color="white" />
                    <Text variant="p3" className="ml-2 text-white">
                      {label}
                    </Text>
                  </Link>
                </div>
              )
          )}
        </div>

        <div className="mt-6">
          <Button
            icon={<LuCirclePlus />}
            className="w-4/4 !h-[40px] transition-transform transform hover:scale-105 hover:bg-white/10"
            customColor="white"
            onClick={() => router.push("/add-transaction")}
          >
            Add Transaction
          </Button>
        </div>
        {currentUser?._id && isMounted && (
          <div
            className="fixed bottom-8 flex items-center justify-center space-x-2 cursor-pointer"
            onClick={openModal}
          >
            <MdLogout className="text-2xl text-white" />
            <Text variant="p3" className="text-white">
              Logout
            </Text>
          </div>
        )}
      </nav>

      <LogoutModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onConfirmLogout={handleLogout}
      />

      <CardModal
        isOpen={isCardModalOpen}
        closeModal={() => setCardModalOpen(false)}
      />
    </aside>
  );
};
