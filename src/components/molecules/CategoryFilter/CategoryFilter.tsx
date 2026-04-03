import React from "react";
import { Dropdown, Checkbox, MenuProps } from "antd";
import { FiMoreVertical } from "react-icons/fi";
import { Text } from "@/components/atoms";

type CategoryFilterProps = {
  labels: string[];
  colors: string[];
  selectedLabels: string[];
  onToggle: (label: string) => void;
  onReset: () => void;
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  labels,
  colors,
  selectedLabels,
  onToggle,
  onReset,
}) => {
  const menuItems: MenuProps["items"] = labels.map((label, index) => ({
    key: label,
    label: (
      <div
        className="flex items-center justify-between gap-3 rounded-xl px-2 py-2 hover:bg-slate-50"
        onClick={(e) => {
          e.stopPropagation();
          onToggle(label);
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: colors[index] }}
          />
          <Text variant="p4" className="text-slate-700">
            {label}
          </Text>
        </div>
        <Checkbox checked={selectedLabels.includes(label)} />
      </div>
    ),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={["click"]}
      placement="bottomRight"
      dropdownRender={(menu) => (
        <div className="min-w-[240px] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
          <div className="mb-2 flex items-center justify-between border-b border-slate-100 px-3 py-2">
            <Text variant="p5" className="font-semibold text-slate-800">
              Filter Categories
            </Text>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="text-xs font-medium text-primaryBase hover:underline"
            >
              Reset
            </button>
          </div>
          {menu}
        </div>
      )}
    >
      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-all hover:border-slate-300 hover:text-slate-800">
        <FiMoreVertical className="h-4 w-4" />
      </button>
    </Dropdown>
  );
};
