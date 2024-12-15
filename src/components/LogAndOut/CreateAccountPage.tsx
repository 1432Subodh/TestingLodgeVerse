"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const CreateAccountPage: React.FC = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      fullname: formData.get("fullname"),
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log("Form Data:", data);

    const createAccount = async () => {
      const response = await fetch('/api/auth/createAccount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        console.log(error)
        throw new Error(error.error.replaceAll("Firebase:", "") || "Failed to create account");
      }

      return response.json();
    };

    // Use toast.promise to handle the API request
    toast.promise(
      createAccount(),
      {
        loading: "Creating account...",
        success: "Account created successfully!",
        error: (err) => err.message || "An error occurred.",
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-lg font-semibold">
            Create Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullname" className="block mb-2 text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                placeholder="Enter your Full Name"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="username" className="block mb-2 text-sm font-medium">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                type="text"
                placeholder="Enter your username"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="block mb-2 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                autoComplete=""
                className="w-full"
              />
            </div>
            <div className="pt-4">
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateAccountPage;
