import React from "react";
import { Navbar } from "../Navbar";
import { getDarkMode } from "../../../redux/features/theme";
import { useAppSelector } from "../../../redux";
import { Footer } from "../Footer";

type MainLayoutProps = {
  children: React.ReactNode;
  showNavbar?: boolean;
};

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showNavbar = true,
}) => {
  const isDarkMode = useAppSelector(getDarkMode);

  return (
    <section className={`${isDarkMode ? "dark bg-black" : "bg-white"}`}>
      {showNavbar && <Navbar />}
      <React.Fragment>
        <div>{children}</div>
      </React.Fragment>
      <Footer />
    </section>
  );
};
