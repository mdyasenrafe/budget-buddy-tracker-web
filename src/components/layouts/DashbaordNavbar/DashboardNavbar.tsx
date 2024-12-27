import { Container } from "@/components/atoms";
import { ProfileDropdown, ThemeToggle } from "./components";

export const DashboardNavbar = () => {
  return (
    <nav className="py-4 shadow-lg bg-white !h-[90px]">
      <Container>
        <div className="flex items-center justify-end gap-3">
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </Container>
    </nav>
  );
};
