import { Container } from "@/components/atoms";
import { ProfileDropdown, ThemeToggle, HeaderContent } from "./components";

export const DashboardNavbar = () => {
  return (
    <nav className="shadow-lg bg-white !h-[80px] flex items-center">
      <Container>
        <div className="flex items-center justify-between">
          <HeaderContent />
          <div className="flex items-center justify-end gap-3">
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </div>
      </Container>
    </nav>
  );
};
