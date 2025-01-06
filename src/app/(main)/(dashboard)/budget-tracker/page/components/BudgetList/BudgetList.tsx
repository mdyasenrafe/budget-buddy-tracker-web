import React, { memo } from "react";
import { Button, Text } from "@/components/atoms";
import { TBudget } from "../../data";
import { BudgetItem } from "./components";
import { FaPlus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

type BudgetListProps = {
  budgets: TBudget[];
  selectedBudget: string | null;
  onBudgetClick: (name: string) => void;
};

export const BudgetList = memo(
  ({ budgets, selectedBudget, onBudgetClick }: BudgetListProps) => {
    return (
      <div>
        <div className="border mb-5 rounded-lg">
          <div className="my-3 border-b p-3 flex justify-between">
            <Text variant="h3">Budgets</Text>
            <div className="w-[40px] h-[40px] bg-primary rounded-full flex justify-center items-center cursor-pointer lg:hidden">
              <FaPlus color="white" size={24} />
            </div>
          </div>

          <div className="block md:hidden">
            <Swiper
              spaceBetween={16}
              slidesPerView={1.1}
              grabCursor
              style={{ padding: "1rem" }}
            >
              {budgets.map((budget) => (
                <SwiperSlide key={budget.name} className="h-full">
                  <BudgetItem
                    budget={budget}
                    isSelected={selectedBudget === budget.name}
                    onClick={() => onBudgetClick(budget.name)}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden md:block p-3">
            {budgets.map((budget) => (
              <BudgetItem
                key={budget.name}
                budget={budget}
                isSelected={selectedBudget === budget.name}
                onClick={() => onBudgetClick(budget.name)}
              />
            ))}
          </div>
        </div>
        <div className="bottom-10 w-[80%] sticky z-10 mx-auto hidden lg:flex">
          <Button
            customColor="primary"
            className="w-full !h-[48px]"
            icon={<FaPlus color="white" />}
          >
            <Text variant="p3" className="font-semibold text-white">
              Add Budget
            </Text>
          </Button>
        </div>
      </div>
    );
  }
);
