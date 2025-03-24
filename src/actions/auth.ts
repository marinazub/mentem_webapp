"use server";

import { signIn } from "@/auth";

export async function handleSignIn(formData: FormData) {
  return await signIn("credentials", {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    redirectTo: "/",
  });
}
