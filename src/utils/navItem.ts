import { NavItem } from "@/types";
import {
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineCreditCard,
  AiOutlineDollarCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

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
    icon: AiOutlineFundProjectionScreen,
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
