import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { LoginInputState, userLoginSchema } from "@/schema/userSchema";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<LoginInputState>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<Partial<LoginInputState>>({});

  // INPUT CHANGE HANDLER
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // SUBMIT HANDLER
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 1. LOGIN FORM VALIDATION
    const result = userLoginSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<LoginInputState>);
      return;
    }
    // 2. API IMPLEMENTATION
    console.log(input);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border-gray-200 mx-4"
      >
        <div className="mb-4 flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Welcome to Restauant</h1>
          <p className="text-gray-400 font-semibold">Login to continue</p>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="john@gmail.com"
              name="email"
              className="pl-10 pr-4 placeholder:text-gray-300 focus:visited:ring-1"
              value={input.email}
              onChange={handleInputChange}
            />
            <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-sm text-red-500 font-semibold">
                {error.email}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              name="password"
              placeholder="password"
              className="pl-10 pr-4 placeholder:text-gray-300 focus:visited:ring-1"
              value={input.password}
              onChange={handleInputChange}
            />
            <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-sm text-red-500 font-semibold">
                {error.password}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          {loading ? (
            <Button
              disabled={loading}
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full bg-orange hover:bg-hoverOrange">
              Login
            </Button>
          )}

          <div className="mt-4 text-right underline font-semibold text-sm hover:text-black/75">
            <Link to="/forgot-password">Forgot password</Link>
          </div>
        </div>
        <Separator />
        <p className="mt-4 text-center">
          Don't have an account?
          <Link
            to="/signup"
            className="font-semibold underline hover:text-black/75 ml-1"
          >
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
