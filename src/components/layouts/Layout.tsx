import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 dark:bg-gray-900 mt-[68px]">{children}</main>
      <Footer />
    </div>
  );
};
