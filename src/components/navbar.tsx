"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowRightToLineIcon, UploadIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center h-16">
      <div className="w-full max-w-md flex items-center justify-between p-2 sm:border-x shadow-md bg-white">
        <button
          onClick={() => signOut()}
          title="Logout"
          className="h-8 w-8 flex items-center justify-center"
        >
          <ArrowRightToLineIcon size={20} />
        </button>

        <h1 className="text-2xl font-light">MENTEM</h1>

        <button className="h-8 w-8 flex items-center justify-center">
          <UploadIcon size={18} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
