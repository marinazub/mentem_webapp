"use client";

import { sendMessage } from "@/actions/chat";
import { Button } from "@/components/ui/button";
import { v4 as uuid4 } from "uuid";
import { ArrowUpIcon, LoaderCircleIcon, PlusIcon } from "lucide-react";
import React, { useEffect } from "react";

type Props = {};

const HomePage = (props: Props) => {
  const [sessionId, setSessionId] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [messages, setMessages] = React.useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const scrollTargetRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);

    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;

      // Restrict to max height (5 lines) and enable scroll only if more than 5 lines
      if (textarea.scrollHeight > 120) {
        textarea.style.height = "120px"; // Max height (5 lines)
        textarea.style.overflowY = "auto"; // Enable scrolling
      } else {
        textarea.style.overflowY = "hidden"; // Hide scrollbar when under 5 lines
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent new line
      handleSubmit(); // Call submit function
    }
  };

  const scrollToBottom = () => {
    if (scrollTargetRef.current) {
      scrollTargetRef.current.scrollIntoView({ behavior: "smooth" });
    }
    // if (chatContainerRef.current) {
    //   chatContainerRef.current.scrollTop =
    //     chatContainerRef.current.scrollHeight;
    // }
  };

  const handleSubmit = async () => {
    if (textareaRef.current) {
      textareaRef.current.value = "";
      textareaRef.current.style.height = "auto";
      setMessage("");
    }
    console.log("SessionID::: ", sessionId);
    if (sessionId) {
      setMessages((prev) => {
        const lastEl = prev.at(-1);
        return [
          ...prev,
          { id: lastEl ? lastEl?.id + 1 : 1, sender: "user", text: message },
        ];
      });
      setIsSubmitting(true);
      const response = await sendMessage(message, sessionId);
      setIsSubmitting(false);

      if (response.message) {
        setMessages((prev) => {
          const lastEl = prev.at(-1);
          return [
            ...prev,
            {
              id: lastEl ? lastEl?.id + 1 : 1,
              sender: "bot",
              text: response.message,
            },
          ];
        });
      }
    }
  };

  useEffect(() => {
    const newSessionId = uuid4();
    setSessionId(newSessionId);
  }, []);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-[calc(100vh_-_64px)] w-full flex flex-col">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        <div className="p-3">
          <h2 className="text-2xl font-semibold">Hi Jane,</h2>
          <div className="my-3 text-sm">
            I’m Gino...your provider’s screening assistant. It’s great to meet
            you, Jane D! Let’s start by getting to know each other.
            <br />
            <br />
            How have you been feeling recently?
          </div>
        </div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg text-sm text-black max-w-[75%] ${
                msg.sender === "user" ? "bg-[#79D8FE]/20 " : "bg-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={scrollTargetRef} />
      </div>
      <div className="h-auto border bg-white flex flex-col p-2">
        <textarea
          disabled={isSubmitting}
          ref={textareaRef}
          placeholder="Type here..."
          onKeyDown={handleKeyDown}
          onChange={handleInput}
          rows={1}
          className="p-2 focus:outline-0 resize-none w-full"
          style={{
            maxHeight: "120px", // Restrict max height (5 lines)
          }}
        />
        <div className="flex justify-between items-center">
          <button className="rounded-full border flex items-center justify-center mt-1 h-9 w-9">
            <PlusIcon size={20} />
          </button>
          <button
            disabled={isSubmitting}
            onClick={handleSubmit}
            className={`rounded-full border flex items-center justify-center mt-1 h-9 ${
              isSubmitting
                ? "w-fit px-2 duration-300 bg-blue-500 text-white text-sm "
                : "w-9 hover:cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <LoaderCircleIcon className="animate-spin mr-1" />
                Please wait...
              </span>
            ) : (
              <ArrowUpIcon size={20} />
            )}
          </button>
          {/* <button
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
            className="rounded-full bg-blue-100 border flex items-center justify-center mt-1 h-9 w-9 hover:cursor-pointer"
          >
            <ArrowUpIcon size={20} />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
