import { Text } from "@/components/atoms";
import { Dropdown, MenuProps } from "antd";
import Link from "next/link";
import React from "react";
import { FiMoreHorizontal, FiMoreVertical } from "react-icons/fi";

type Props = {
  transactionId: string;
};

export const TransactionItemDropdown: React.FC<Props> = ({ transactionId }) => {
  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: <Text>View</Text>,
    },
    {
      key: "2",
      label: <Text>Delete</Text>,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: menuItems }} placement="bottomLeft">
        <FiMoreHorizontal
          className="h-5 w-5 text-gray-500 text-end"
          color={"black"}
        />
      </Dropdown>
    </>
  );
};
