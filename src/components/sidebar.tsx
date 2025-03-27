import { ArrowLeftToLineIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import UserButton from "./user-btn";

type Props = {};

const SidebarComponent = (props: Props) => {
  return (
    <aside className="hidden sm:block h-screen fixed w-72 bg-[#EAEDEF] px-3 ">
      <div className="h-16 flex items-center justify-between mb-4">
        <h1 className="text-2xl font-normal">MENTEM</h1>
        <button className="h-8 w-8 flex items-center justify-center">
          <ArrowLeftToLineIcon size={20} />
        </button>
      </div>
      <Button
        variant={"outline"}
        className="rounded-xs w-full cursor-pointer bg-transparent border-black"
      >
        Start a new conversation
      </Button>
      <div className="mt-10">
        <h4 className="text-sm font-semibold">Conversation history</h4>
        <ul className="text-sm  mt-5">
          <li>February 21, 2025 check-in</li>
        </ul>
      </div>
      <div className="border-t px-4 flex items-center w-full justify-center border-black/20 absolute left-0 right-0 bottom-0 h-20">
        <UserButton />
      </div>
    </aside>
  );
};

export default SidebarComponent;
