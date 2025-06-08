import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card, CardContent, CardFooter, CardHeader, CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginUser } from "./loginprocess";

function CardDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await loginUser({ email, password });
      console.log("Response from server:", data);
      // Redirect or store token here if needed
    } catch (err) {
      console.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-2 flex items-center text-sm text-gray-600 hover:text-gray-800"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2" />
      </Card>
    </div>
  );
}

export default CardDemo;
