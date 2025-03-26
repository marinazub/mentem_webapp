"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { handleSignIn } from "@/actions/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "@/components/ui/date-picker";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signupAction } from "@/actions/signup";
import { z } from "zod";

const formSchema = z.object({
  fName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  gender: z.enum(["male", "female", "other"]),
  dob: z.date(),
  zip: z.string().regex(/^\d{5}(?:-\d{4})?$/, { message: "Invalid zip code." }),
  insurance: z
    .string()
    .min(2, { message: "Insurance name must be at least 2 characters." }),
  service: z.enum(["online", "in-person"]),
  emergencyName: z
    .string()
    .min(2, { message: "Emergency name must be at least 2 characters." }),
  emergencyPhone: z
    .string()
    .regex(/^\d{3}-\d{3}-\d{4}$/, { message: "Invalid phone number." }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [gender, setGender] = useState<"male" | "female" | "other">("male");
  const [servicePreference, setServicePreference] = useState<
    "online" | "in-person"
  >("online");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    console.log("Form Submitted:", { email, password });
    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!loginRes?.error) {
      toast.success("Login successful!");
      setTimeout(() => {
        router.replace("/");
      }, 500);
    } else {
      toast.error("Login failed. Try again.");
    }
  };

  const signupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // const fname = formData.get("fName") as string;
    // const lname = formData.get("lName") as string;
    // const zip = formData.get("zip") as string;
    // const emergencyName = formData.get("emergencyName") as string;
    // const emergencyPhone = formData.get("emergencyPhone") as string;
    // const insuranceCompany = formData.get("insuranceCompany") as string;
    // const email = formData.get("email") as string;
    formData.append("gender", gender);
    formData.append("service", servicePreference);
    if (dob) {
      formData.append("dob", dob.toISOString());
    }

    // const formValues: FormValues = {
    //   fName: formData.get("fName") as string,
    //   lName: formData.get("lName") as string,
    //   gender: gender,
    //   dob: dob as Date,
    //   zip: formData.get("zip") as string,
    //   insurance: formData.get("insurance") as string,
    //   service: servicePreference,
    //   emergencyName: formData.get("emergencyName") as string,
    //   emergencyPhone: formData.get("emergencyPhone") as string,
    // };

    // const result = formSchema.safeParse(formValues);

    let response = await signupAction(formData);
    response.success
      ? toast.success(response.message)
      : toast.error(response.message);

    // const password = formData.get("password") as string;

    // console.log({
    //   fname,
    //   lname,
    //   dob,
    //   zip,
    //   emergencyName,
    //   emergencyPhone,
    //   insuranceCompany,
    //   email,
    //   password,
    //   servicePreference,
    //   gender,
    // });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative ">
      <div className="w-full h-[55vh] bg-gradient-to-b from-blue-700 to-blue-400 flex justify-center">
        <h1 className="text-4xl font-light text-white mt-30">MENTEM</h1>
      </div>

      <div className="w-full min-h-[45vh] max-h-screen flex items-center justify-center"></div>

      <div className="w-full max-w-md absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-transparent">
        <div className="rounded-lg bg-white m-3 p-6 shadow-lg ">
          <h1 className="font-semibold text-xl mb-4">Welcome,</h1>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="•••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Link
                    href="#"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                  <Button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500"
                  >
                    Log In
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signupSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-name">First Name</Label>
                  <Input id="f-name" name="fName" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="l-name">Last Name</Label>
                  <Input id="l-name" name="lName" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(val: "male" | "female" | "other") =>
                      setGender(val)
                    }
                  >
                    <SelectTrigger className="w-full" id="gender">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" name="dob" type="date" className="w-full" />
                  {/* <DatePicker id="dob" onDateSelect={setDob} /> */}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" name="zip" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceCompany">Insurance Company</Label>
                  <Input
                    id="insuranceCompany"
                    name="insuranceCompany"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Preference</Label>
                  <RadioGroup
                    defaultValue="online"
                    className="flex pt-1"
                    onValueChange={(val: "online" | "in-person") =>
                      setServicePreference(val)
                    }
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="in-person" id="in-person" />
                      <Label htmlFor="in-person">In Person</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-5">
                  <h4 className="text-lg font-semibold">Emergency Contact</h4>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-name">Name</Label>
                  <Input
                    id="emergency-name"
                    name="emergencyName"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Phone</Label>
                  <Input
                    id="emergency-phone"
                    name="emergencyPhone"
                    className="w-full"
                  />
                </div>
                <div className="mt-5">
                  <h4 className="text-lg font-semibold">Authentication</h4>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" name="password" className="w-full" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Button
                    type="submit"
                    className="bg-blue-400 hover:bg-blue-500"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
