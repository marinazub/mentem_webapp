import Navbar from "@/components/navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <React.Fragment>
      <div className="bg-gradient-to-b from-blue-700 to-blue-200">
        <Navbar />
        <div className="w-full max-w-md mx-auto pt-16 bg-white">
          <main className="flex justify-center sm:border-x">{children}</main>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdminLayout;
