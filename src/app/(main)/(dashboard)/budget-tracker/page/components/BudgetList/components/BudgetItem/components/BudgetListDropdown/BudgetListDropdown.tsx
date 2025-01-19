import { Text } from "@/components/atoms";
import { useModal } from "@/hooks";
import { TBudget } from "@/redux/features/budget";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { FiMoreVertical } from "react-icons/fi";

type BudgetListDropdown = {
  activeBudget: TBudget;
};

export const BudgetListDropdown: React.FC<BudgetListDropdown> = ({
  activeBudget,
}) => {
  const { openModal, isModalOpen, closeModal } = useModal();
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/budget-tracker/edit-budget/${activeBudget?._id}`}>
          <Text>Edit</Text>
        </Link>
      ),
    },
    {
      key: "2",
      label: <Text onClick={openModal}>Delete</Text>,
    },
  ];
  return (
    <>
      <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
        <FiMoreVertical className="h-5 w-5 text-gray-500" />
      </Dropdown>
    </>
  );
};
