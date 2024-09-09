import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";

type SignupInputState = {
  fullname: string;
  email: string;
  password: string;
  contact: string;
};

const Signup = () => {
  const fullnameError = false;
  const emailError = false;
  const passwordError = false;
  const contactError = false;
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  // INPUT CHANGE HANDLER
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  // SUBMIT HANDLER
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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
            {fullnameError && (
              <span className="text-sm text-red-500 font-semibold">
                *Fullname is required
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
            {emailError && (
              <span className="text-sm text-red-500 font-semibold">
                *Email is required
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
            {passwordError && (
              <span className="text-sm text-red-500 font-semibold">
                Password is required
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
            {contactError && (
              <span className="text-sm text-red-500 font-semibold">
                Contact number is required
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
