"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
    const searchParams = useSearchParams();
    const isAdmin = searchParams.get('admin');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        // Use toast.promise to handle the API request
        toast.promise(
            loginUser(data),
            {
                loading: "Logging in...",
                success: "Login successful!",
                error: (err) => err.message || "An error occurred during login.",
            }
        );
    };

    const loginUser = async (data: { email: FormDataEntryValue | null; password: FormDataEntryValue | null }) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            throw new Error(error.code || "Failed to log in");
        }

        const userData = await response.json();

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(userData.user));

        // Redirect based on role
        if (isAdmin) {
            window.location.href = '/admin/dashboard';
        } else {
            window.location.href = '/lodge';
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-lg font-semibold">
                        Login
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                className="w-full"
                                autoComplete=""
                            />
                        </div>
                        <div className="pt-4">
                            <Button type="submit" className="w-full">
                                Login
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
