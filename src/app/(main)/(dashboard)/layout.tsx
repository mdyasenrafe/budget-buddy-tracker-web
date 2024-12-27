import { CommonLayout, Navbar } from "@/components/layouts";
import { DashboardNavbar } from "@/components/layouts/DashbaordNavbar";
import { TProps } from "@/types";

const Layout: React.FC<TProps> = ({ children }) => {
  return <CommonLayout>{children}</CommonLayout>;
};

export default Layout;
