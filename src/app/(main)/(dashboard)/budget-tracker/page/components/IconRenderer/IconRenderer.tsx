"use client";

import React, { useMemo } from "react";
import {
  FaShoppingCart,
  FaLightbulb,
  FaHeartbeat,
  FaBus,
  FaGraduationCap,
  FaPlane,
  FaPiggyBank,
  FaMusic,
  FaUtensils,
  FaHome,
  FaChild,
  FaHandsHelping,
  FaWallet,
} from "react-icons/fa";
import { useAppSelector } from "@/redux";
import {
  getIncomeCategories,
  getExpenseCategories,
} from "@/redux/features/category";

type IconRendererProps = {
  category: string;
};

const SIZE = 16;

const categoryIconMap: Record<string, React.ReactNode> = {
  groceries: <FaShoppingCart size={SIZE} />,
  utilities: <FaLightbulb size={SIZE} />,
  healthcare: <FaHeartbeat size={SIZE} />,
  transportation: <FaBus />,
  education: <FaGraduationCap />,
  travel: <FaPlane />,
  shopping: <FaShoppingCart />,
  dining_out: <FaUtensils />,
  entertainment: <FaMusic />,
  savings: <FaPiggyBank />,
  childcare: <FaChild />,
  home_maintenance: <FaHome />,
  charity_donations: <FaHandsHelping />,
};

export const IconRenderer: React.FC<IconRendererProps> = ({ category }) => {
  const incomeCategories = useAppSelector(getIncomeCategories);
  const expenseCategories = useAppSelector(getExpenseCategories);

  const allCategories = useMemo(() => {
    return [
      ...(incomeCategories || []).map((cat) =>
        cat.value.toLowerCase().replace(/\s+/g, "_")
      ),
      ...(expenseCategories || []).map((cat) =>
        cat.value.toLowerCase().replace(/\s+/g, "_")
      ),
    ];
  }, [incomeCategories, expenseCategories]);

  const normalizedCategory = useMemo(
    () => category.toLowerCase().replace(/\s+/g, "_"),
    [category]
  );
  const icon = useMemo(() => {
    if (allCategories.includes(normalizedCategory)) {
      return categoryIconMap[normalizedCategory] || <FaWallet />;
    }
    return <FaWallet />;
  }, [normalizedCategory, allCategories]);

  return <>{icon}</>;
};
