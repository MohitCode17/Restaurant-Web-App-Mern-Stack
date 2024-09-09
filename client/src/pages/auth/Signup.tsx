import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignupInputState, userSignupSchema } from "@/schema/userSchema";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });
  /*
    Partial<SignupInputState> is a TypeScript utility type that makes all the properties of the SignupInputState type optional.
    Equivalent to:
    {
      fullname?: string;
      email?: string;
      password?: string;
      contact?: string;
    }
  */
  const [error, setError] = useState<Partial<SignupInputState>>({});

  // INPUT CHANGE HANDLER
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // SUBMIT HANDLER
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 1. SIGNUP FORM VALIDATEION
    const result = userSignupSchema.safeParse(input);
    // RESULT WILL BE TRUE OR FALSE
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setError(fieldErrors as Partial<SignupInputState>);
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
          <h1 className="font-bold text-2xl">
            Ready to get a taste of the best?
          </h1>
          <p className="text-gray-400 font-semibold">Sign Up and Enjoy!</p>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="john doe"
              name="fullname"
              className="pl-10 pr-4 placeholder:text-gray-300 focus:visited:ring-1"
              value={input.fullname}
              onChange={handleInputChange}
            />
            <User className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-sm text-red-500 font-semibold">
                {error.fullname}
              </span>
            )}
          </div>
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
          <div className="relative">
            <Input
              type="text"
              name="contact"
              placeholder="01122335567"
              className="pl-10 pr-4 placeholder:text-gray-300 focus:visited:ring-1"
              value={input.contact}
              onChange={handleInputChange}
            />
            <PhoneOutgoing className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
            {error && (
              <span className="text-sm text-red-500 font-semibold">
                {error.contact}
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
              Signup
            </Button>
          )}
        </div>
        <Separator />
        <p className="mt-4 text-center">
          Already have an account?
          <Link
            to="/login"
            className="font-semibold underline hover:text-black/75 ml-1"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
