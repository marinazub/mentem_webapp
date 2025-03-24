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

export default function LoginPage() {
  const [email, setEmail] = useState("admin@infisum.com");
  const [password, setPassword] = useState("••••••••••");
  const [rememberMe, setRememberMe] = useState(false);

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
              <form action={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
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
              <form action={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="f-name">First Name</Label>
                  <Input id="f-name" name="f-name" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="l-name">Last Name</Label>
                  <Input id="l-name" name="l-name" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Gender</Label>
                  <Select>
                    <SelectTrigger className="w-full">
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
                  <DatePicker id="dob" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" name="zip" className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insurance">Insurance Company</Label>
                  <Input id="insurance" name="insurance" className="w-full" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Service Preference</Label>
                  <RadioGroup defaultValue="option-one" className="flex pt-1">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Online</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">In Person</Label>
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
                    name="emergency-name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Phone</Label>
                  <Input
                    id="emergency-phone"
                    name="emergency-phone"
                    className="w-full"
                  />
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
