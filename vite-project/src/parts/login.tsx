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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Response from server:", data);
    } catch (err) {
      console.error("Login failed");
    }
  };

  return (
    <Card className="w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 shadow-lg">
      <CardHeader>
        <CardTitle className="text-white text-center text-4xl font-bold">
          LOGIN
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-white placeholder-gray-300"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-white">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-white placeholder-gray-300"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2" />
    </Card>
  );
}

export default CardDemo;
