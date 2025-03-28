"use client";

import React from "react";
import { Button } from "./ui/button";
import {
  ArrowLeftToLineIcon,
  ArrowRightToLineIcon,
  UploadIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SidebarComponent from "./sidebar";
import UserButton from "./user-btn";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();
  return (
    <React.Fragment>
      <div className="hidden sm:flex fixed top-2 rounded-t-sm right-2 left-72 px-4 justify-between items-center h-14 border-b-2 border-[#EAEDEF] bg-white">
        <div></div>
        <button className="h-8 w-fit border px-3 text-sm border-black rounded-xs flex items-center justify-center">
          <UploadIcon size={14} className="me-2" />
          Share
        </button>
      </div>
      <div className="sm:hidden fixed top-0 left-0 right-0 flex justify-center h-16">
        <div className="w-full flex items-center justify-between p-2 sm:border-x shadow-md bg-white">
          <Sheet>
            <SheetTrigger>
              <ArrowRightToLineIcon size={20} />
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#EAEDEF] w-72 max-w-72">
              <SheetHeader hidden>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
              <aside className="  px-3 ">
                <div className="h-16 flex items-center justify-between mb-4">
                  <h1 className="text-2xl font-normal">MENTEM</h1>
                </div>
                <Button
                  variant={"outline"}
                  className="rounded-xs w-full cursor-pointer bg-transparent border-black"
                >
                  Start a new conversation
                </Button>
                <div className="mt-10">
                  <h4 className="text-sm font-semibold">
                    Conversation history
                  </h4>
                  <ul className="text-sm  mt-5">
                    <li>February 21, 2025 check-in</li>
                  </ul>
                </div>
                <div className="border-t px-4 flex items-center w-full justify-center border-black/20 absolute left-0 right-0 bottom-0 h-20">
                  <UserButton />
                </div>
              </aside>
            </SheetContent>
          </Sheet>

          <h1 className="text-2xl font-light">MENTEM</h1>

          <button className="h-8 w-8 flex items-center justify-center">
            <UploadIcon size={18} />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Navbar;
