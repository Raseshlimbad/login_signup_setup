"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login, signup } from "@/store/authSlice";
import { useMutation, gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      isAdmin
    }
  }
`;

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      id
      email
      username
      isAdmin
    }
  }
`;

export default function AuthCard() {
  const dispatch = useDispatch();
  const [login_mutation] = useMutation(LOGIN);
  const [signup_mutation] = useMutation(SIGNUP);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  // Add these state variables after other useState declarations
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  // Add validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!loginData.email || !loginData.password) {
      toast.error("Please fill in all fields");
      return;
    }
  
    if (!validateEmail(loginData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(loginData.password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }
  
    try {
      const { data } = await login_mutation({
        variables: {
          email: loginData.email,
          password: loginData.password,
        },
      });
  
      if (data && data.login) {
        const userData = {
          id: data.login.id,
          email: data.login.email,
          username: data.login.username,
          isAdmin: data.login.isAdmin // Add isAdmin field
        };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(login(userData));
        toast.success(`Logged in successfully! 🎉`);
        router.push('/');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Login failed ❌");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate signup data
    if (!signupData.email || !signupData.password || !signupData.confirmPassword || !signupData.username) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!validateEmail(signupData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!validatePassword(signupData.password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    if (signupData.password !== signupData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    if (signupData.username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    try {
      const { data } = await signup_mutation({
        variables: {
          username: signupData.username,
          email: signupData.email,
          password: signupData.password,
        },
      });

      if (data && data.signup) {
        const userData = {
          id: data.signup.id,
          email: data.signup.email,
          username: data.signup.username,
          isAdmin: data.signup.isAdmin // Add isAdmin field
        };
        localStorage.setItem("user", JSON.stringify(userData));
        dispatch(signup(userData));
        toast.success(`Registration successful! 🎉`);
        router.push('/');
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Registration failed:", error);
      toast.error(error.message || "Registration failed");
    }
  };

  // Add PasswordHelper component inside AuthCard
  const PasswordHelper = () => {
    const [modalStatus, setModalStatus] = useState<boolean>(true);

    const setDefaultCredentials = () => {
      setLoginData({
        email: "admin@admin.com",
        password: "Admin@123",
      });
    };

    return (
      <>
        {modalStatus && (
          <div className="absolute bottom-6 right-6 flex min-h-20 flex-col gap-4 rounded-md border-[2px] border-neutral-300 bg-white px-4 py-4">
            <span className="text-lg font-medium">
              Add the default login credentials.
            </span>
            <button
              className="rounded-md border border-neutral-700 bg-neutral-900 px-4 py-2 text-white"
              onClick={setDefaultCredentials}
            >
              Add Credentials
            </button>
            <button
              className="rounded-md border border-neutral-900 px-4 py-2"
              onClick={() => setModalStatus(false)}
            >
              Close
            </button>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle>Welcome to Website</CardTitle>
          <CardDescription>
            Project management and collaboration app tailored for your team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
              <PasswordHelper />
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-username">Username</Label>
                  <Input
                    id="signup-username"
                    type="text"
                    placeholder="Choose a username"
                    value={signupData.username}
                    onChange={(e) =>
                      setSignupData({ ...signupData, username: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="Create a password"
                      value={signupData.password}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          password: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showSignupPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={signupData.confirmPassword}
                      onChange={(e) =>
                        setSignupData({
                          ...signupData,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}