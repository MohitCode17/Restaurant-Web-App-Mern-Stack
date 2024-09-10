import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { FormEvent, useRef, useState } from "react";

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);

  // A REFERENCE TO THE INPUT ELEMENTS, USED TO FOCUS THE NEXT OR PREV. INPUT DYNAMICALLY WHEN TYPING OR DELETING CHARACTERS.
  const inputRef = useRef<any>([]);

  const handleInputChange = (index: number, value: string) => {
    // THE if (/^[a-zA-Z0-9]$/.test(value) || value === "") LINE ENSURES THAT ONLY ALPHANUMERIC CHARACTERS OR AN EMPTY STRING ARE ALLOWED. IF THE INPUT IS VALID, THE FUNCTION PROCEEDS TO UPDATE THE OTP STATE.
    if (/^[a-zA-Z0-9]$/.test(value) || value === "") {
      const newOtp = [...otp]; // CREATES A SHALLOW COPY OF THE CURRENT OTP ARRAY
      newOtp[index] = value; // UPDATE THE OTP ARRAY AT SPECIFIED INDEX WITH THE NEW VALUE
      setOtp(newOtp);
    }

    // MOVE TO THE NEXT INPUT IF CURRENT INPUT IS NOT EMPTY AND CURRENT INPUT IS NOT LAST ONE
    if (value !== "" && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  // FUNCTION HANDLES THE BACKSPACE KEY, ALLOWS THE USER TO MOVE TO THE PREV. INPUT FIELD WHEN DELETING CHARACTERS.
  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    //  CHECKS IF THE BACKSPACE KEY IS PRESSED, THE CURRENT INPUT FIELD IS EMPTY (!otp[index]), AND THE CURRENT FIELD IS NOT THE FIRST ONE, IF TRUE, IT MOVES THE FOCUS TO THE PREV. FIELD
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border-gray-200 mx-4"
      >
        <div className="mb-4 flex flex-col gap-1">
          <h1 className="font-bold text-2xl">Verify your email</h1>
          <p className="text-gray-400 font-semibold">
            Enter 6 digit code sent to your register email address
          </p>
        </div>
        <div className="mb-4 flex justify-between">
          {otp.map((letter: string, index: number) => (
            <Input
              type="text"
              key={index}
              ref={(element) => (inputRef.current[index] = element)}
              className="h-8 w-8 md:h-12 md:w-12 text-center text-sm md:text-2xl font-normal md:font-bold rounded-lg"
              value={letter}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange(index, e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                handleKeyDown(index, e)
              }
            />
          ))}
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
              Verify
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyEmail;
