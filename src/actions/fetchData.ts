"use server";

export const fetchHistoryData = async (userId: string) => {
  const res = await fetch(
    "https://rk4fbjcyc0.execute-api.us-east-1.amazonaws.com/default/chat_history",
    {
      method: "POST",
      body: JSON.stringify({
        user_id: userId,
      }),
    }
  );

  const response = await res.json();
  console.log(response);
};
