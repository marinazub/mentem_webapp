"use client";

import { ArrowLeftToLineIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import UserButton from "./user-btn";
import { format } from "date-fns";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuid4 } from "uuid";

import { useAppContext } from "@/context/useAppContext";
type Props = {};

const SidebarComponent = (props: Props) => {
  const { sessionHistory } = useAppContext();
  const router = useRouter();
  // const searchParams = useSearchParams();

  useEffect(() => {
    const newSessionId = uuid4();
    router.replace(`/?sessionId=${newSessionId}`);
  }, []);

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
        onClick={() => {
          const newSessionId = uuid4();
          router.replace(`/?sessionId=${newSessionId}`);
        }}
      >
        Start a new conversation
      </Button>
      <div className="mt-10">
        <h4 className="text-sm font-semibold">Conversation history</h4>
        <ul className="text-sm  mt-5">
          {sessionHistory.length === 0 ? (
            <li>No conversation history available.</li>
          ) : (
            sessionHistory.map((el) => (
              <li
                key={el.session_id}
                className="py-2 ps-2 border-b border-gray-300 hover:bg-gray-200"
              >
                <Link href={`/?sessionId=${el.session_id}`} className="block">
                  {format(new Date(el.timestamp), "MMMM d, yyyy")}
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="border-t px-4 flex items-center w-full justify-center border-black/20 absolute left-0 right-0 bottom-0 h-20">
        <UserButton />
      </div>
    </aside>
  );
};

export default SidebarComponent;
