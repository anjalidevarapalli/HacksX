import { useState } from "react";
import  {Card, CardContent, CardHeader, CardTitle } from "../components/ui/Card";
import  Button  from "../components/ui/Button";
import  Input  from "../components/ui/Input";
import { Link } from "react-router-dom";

export default function SignupLogin() {
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      console.log("Signing up with", email, password);
    } else {
      console.log("Logging in with", email, password);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Signing in with Google");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-96 p-6 shadow-lg">
        <CardHeader>
          <CardTitle>{isSignup ? "Sign Up" : "Login"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              {isSignup ? "Sign Up" : "Login"}
            </Button>
          </form>
          <Button
            variant="link"
            className="mt-4 w-full"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
          </Button>
          <Button
            className="mt-4 w-full bg-red-500 text-white"
            onClick={handleGoogleSignIn}
          >
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
