import { NavItem } from "@/types";
import { GrHomeRounded } from "react-icons/gr";
import { MdAttachMoney, MdBarChart, MdCreditCard } from "react-icons/md";

export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/dashboard",
    icon: GrHomeRounded,
    desktop: true,
  },
  {
    id: 2,
    label: "Analytics",
    path: "/analytics",
    icon: MdBarChart,
    desktop: true,
  },
  {
    id: 3,
    label: "Cards",
    path: "/card-management",
    icon: MdCreditCard,
    desktop: true,
  },
  {
    id: 4,
    label: "Budget",
    path: "/budget-tracker",
    icon: MdAttachMoney,
    desktop: true,
  },
];
