import React from "react";
import NavBar from "./navbar";
import Footer from "./footer";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};
export default RootLayout;
