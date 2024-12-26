import { NavItem } from "@/types";
import {
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineDollarCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { SiSimpleanalytics } from "react-icons/si";

export const navItems: NavItem[] = [
  {
    id: 1,
    label: "Home",
    path: "/dashboard",
    icon: AiOutlineHome,
    desktop: true,
  },
  {
    id: 2,
    label: "Analytics",
    path: "/analytics",
    icon: SiSimpleanalytics,
    desktop: true,
  },
  {
    id: 3,
    label: "Add Transaction",
    path: "/add-transaction",
    icon: AiOutlinePlusCircle,
    desktop: false,
  },
  {
    id: 4,
    label: "Cards",
    path: "/card-management",
    icon: AiOutlineCreditCard,
    desktop: true,
  },
  {
    id: 5,
    label: "Budget",
    path: "/budget-tracker",
    icon: AiOutlineDollarCircle,
    desktop: true,
  },
];
