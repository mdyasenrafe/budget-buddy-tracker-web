import { colors } from "@/theme";
import { BiWalletAlt } from "react-icons/bi";
import { FiCreditCard } from "react-icons/fi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { TbChartBar } from "react-icons/tb";

export const dashboardMetrics = [
  {
    title: "Total Balance",
    value: "$12,345",
    icon: <BiWalletAlt size={24} />,
    bgColor: colors.blue100,
    iconColor: colors.blue500,
  },
  {
    title: "Monthly Expenses",
    value: "$3,210",
    icon: <RiMoneyDollarCircleLine size={24} />,
    bgColor: colors.yellow100,
    iconColor: colors.yellow500,
  },
  {
    title: "Remaining Budget",
    value: "$1,245",
    icon: <TbChartBar size={24} />,
    bgColor: colors.green100,
    iconColor: colors.green500,
  },
  {
    title: "Total Cards",
    value: "3 Cards",
    icon: <FiCreditCard size={24} />,
    bgColor: colors.purple100,
    iconColor: colors.purple500,
  },
];
