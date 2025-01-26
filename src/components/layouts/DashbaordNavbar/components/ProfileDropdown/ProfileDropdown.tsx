"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Button, Text } from "@/components/atoms";
import { useAppDispatch, useAppSelector } from "@/redux";
import { getCurrentUser, logout } from "@/redux/features/auth";
import { Avatar, Menu, Spin } from "antd";
import { FiLogOut, FiUser, FiX } from "react-icons/fi";
import { LogoutModal } from "@/components/layouts/CommonLayout/components/LeftSideBar/components";
import { useModal } from "@/hooks";
import { clearCookies } from "@/utils";

export const ProfileDropdown: React.FC = () => {
  // State and hooks
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const currentUser = useAppSelector(getCurrentUser);
  const { isModalOpen, openModal, closeModal } = useModal();
  const dispatch = useAppDispatch();
  // Handlers
  const handleToggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    closeModal();
    clearCookies();
  }, []);

  // Lifecycle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Menu items
  const menuItems = [
    {
      key: "profile",
      label: (
        <Button
          className="!border-0 py-2 !bg-none !shadow-none"
          icon={<FiUser className="w-5 h-5" />}
        >
          <Text>Profile</Text>
        </Button>
      ),
    },
    {
      key: "logout",
      label: (
        <Button
          onClick={() => {
            openModal();
            handleToggleDropdown();
          }}
          className="!border-0 py-2"
          icon={<FiLogOut className="w-5 h-5" color="red" />}
        >
          <Text className="text-red-500">Logout</Text>
        </Button>
      ),
    },
  ];

  if (!isMounted) {
    return <Spin size={"small"} />;
  }

  return (
    <div className="relative">
      {currentUser && (
        <div className="flex items-center gap-4">
          <Avatar
            size={50}
            icon={
              isDropdownOpen ? (
                <FiX className="w-6 h-6 text-gray-500 dark:text-gray-300" />
              ) : (
                <img
                  src={currentUser?.photo || "/default-avatar.png"}
                  alt={currentUser.name || "User"}
                  className="w-full h-full"
                />
              )
            }
            onClick={handleToggleDropdown}
            className="cursor-pointer"
          />
        </div>
      )}

      {isDropdownOpen && (
        <div className="absolute top-16 right-0 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg z-10 rounded-lg">
          <Menu
            items={menuItems}
            mode="vertical"
            className="!py-2 rounded-lg border-none"
          />
        </div>
      )}
      <LogoutModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onConfirmLogout={handleLogout}
      />
    </div>
  );
};
