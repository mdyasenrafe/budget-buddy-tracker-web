import { BiWalletAlt } from "react-icons/bi";
import { FiCreditCard } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChartBar } from "react-icons/tb";

export const dashboardMetrics = [
  {
    title: "Total Balance",
    value: "$12,345",
    icon: <BiWalletAlt size={24} />,
    bgColor: "bg-[#D6E4FF]",
    iconColor: "text-[#2F54EB]",
  },
  {
    title: "Monthly Expenses",
    value: "$3,210",
    icon: <RiMoneyDollarCircleLine size={24} />,
    bgColor: "bg-[#FFE7BA]",
    iconColor: "text-[#FA8C16]",
  },
  {
    title: "Remaining Budget",
    value: "$1,245",
    icon: <TbChartBar size={24} />,
    bgColor: "bg-[#E6FFFB]",
    iconColor: "text-[#13C2C2]",
  },
  {
    title: "Total Cards",
    value: "3 Cards",
    icon: <FiCreditCard size={24} />,
    bgColor: "bg-[#F3E5F5]",
    iconColor: "text-[#9C27B0]",
  },
];
