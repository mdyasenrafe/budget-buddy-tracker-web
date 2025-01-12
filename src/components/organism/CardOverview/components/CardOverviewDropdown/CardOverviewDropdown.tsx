import { MenuProps } from "antd";

import React from "react";
import { Dropdown } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import Link from "next/link";
import { Text } from "@/components/atoms";
import { TCard } from "@/redux/features/cardOverview";

type CardOverviewDropdownProps = {
  selected: boolean;
  activeCard: TCard;
};

export const CardOverviewDropdown: React.FC<CardOverviewDropdownProps> = ({
  selected,
  activeCard,
}) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link href={`/card-management/edit-card/${activeCard?._id}`}>
          <Text>Edit</Text>
        </Link>
      ),
    },
    {
      key: "2",
      label: <Text>Delete</Text>,
    },
  ];
  return (
    <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
      <FiMoreVertical
        className="h-5 w-5 text-gray-500 absolute right-0 top-6"
        color={selected ? "white" : "black"}
      />
    </Dropdown>
  );
};
