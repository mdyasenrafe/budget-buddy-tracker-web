import { Container } from "@/components/atoms";
import {
  ProfileDropdown,
  ThemeToggle,
  HeaderContent,
  MonthSelect,
} from "./components";

export const DashboardNavbar = () => {
  return (
    <nav className="shadow-lg bg-white !h-[80px] flex items-center">
      <Container>
        <div className="flex items-center justify-between">
          <HeaderContent />
          <div className="flex items-center justify-end gap-3">
            <MonthSelect />
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </Container>
    </nav>
  );
};
