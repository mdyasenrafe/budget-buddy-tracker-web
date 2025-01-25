"use client";

import { Text } from "@/components/atoms";
import { TransactionDeleteModalWrapper } from "@/components/molecules/TransactionsTable/components";
import { TransactionViewModal } from "@/components/molecules/modals";
import { useModal } from "@/hooks";
import { TTransaction } from "@/redux/features/transaction";
import { Dropdown, MenuProps } from "antd";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";

type Props = {
  transaction: TTransaction;
};

export const TransactionItemDropdown: React.FC<Props> = ({ transaction }) => {
  const { openModal, isModalOpen, closeModal } = useModal();
  const {
    openModal: openDeleteModal,
    isModalOpen: isDeleteModalVisible,
    closeModal: closeDeleteModal,
  } = useModal();

  const menuItems: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Text className="!cursor-pointer" onClick={openModal}>
          View
        </Text>
      ),
    },
    {
      key: "2",
      label: (
        <Text className="!cursor-pointer" onClick={openDeleteModal}>
          Delete
        </Text>
      ),
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
      {isModalOpen && (
        <TransactionViewModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          transaction={transaction}
        />
      )}
      {isDeleteModalVisible && (
        <TransactionDeleteModalWrapper
          isModalOpen={isDeleteModalVisible}
          selectedTransaction={transaction}
          closeModal={closeDeleteModal}
        />
      )}
    </>
  );
};
