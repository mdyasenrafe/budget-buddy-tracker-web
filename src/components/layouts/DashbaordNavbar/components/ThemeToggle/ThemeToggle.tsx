"use client";
import { useAppDispatch, useAppSelector } from "@/redux";
import { getDarkMode, toggleDarkMode } from "@/redux/features/theme";
import React, { useCallback, useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type ThemeToggleProps = {};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({}) => {
  const dispatch = useAppDispatch();
  const isDarkModeEnabled = useAppSelector(getDarkMode);
  // states
  const [isMounted, setIsMounted] = useState(false);

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleDarkMode());
  }, [dispatch]);

  // Lifecycle
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div
      onClick={handleToggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
      aria-label="Toggle Theme"
    >
      {isDarkModeEnabled && isMounted ? (
        <FiMoon className="w-7 h-7 text-gray-500 dark:text-gray-300" />
      ) : (
        <FiSun className="w-7 h-7 text-yellow-500" />
      )}
    </div>
  );
};
