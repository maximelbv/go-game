import { ReactNode } from "react";
import Header from "../components/Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
