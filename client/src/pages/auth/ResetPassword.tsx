import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyholeIcon } from "lucide-react";
import { useState } from "react";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form className="w-full max-w-md rounded-lg border-gray-200 mx-4">
        <div className="mb-4 flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Reset Password</h1>
          <p className="text-gray-400 font-semibold">
            Enter your new password to reset old one
          </p>
        </div>
        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="password"
              name="password"
              className="pl-10 pr-4 placeholder:text-gray-300 focus:visited:ring-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <LockKeyholeIcon className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
          </div>
        </div>
        <div className="mb-2">
          {loading ? (
            <Button
              disabled={loading}
              className="w-full bg-orange hover:bg-hoverOrange"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button className="w-full bg-orange hover:bg-hoverOrange">
              Reset Password
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
