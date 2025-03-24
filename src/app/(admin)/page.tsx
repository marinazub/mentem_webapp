import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import React from "react";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <div className="h-[calc(100vh_-_64px)] w-full flex flex-col">
      <div className="flex-1">hello</div>
      <div className="h-24 border bg-white flex flex-col p-2">
        <input placeholder="Type here" className="p-2" />
        <button className="w-fit rounded-full border flex items-center justify-center p-1 mt-1">
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

export default HomePage;
