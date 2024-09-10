import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/hero.png";

const Hero = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:p-10 rounded-lg items-center justify-center m-4 gap-16 md:gap-28 px-2 mt-16 md:mt-10">
      <div className="flex flex-col gap-10 md:w-[40%]">
        {/* TEXT AREA */}
        <div className="flex flex-col gap-5">
          <h1 className="font-bold md:font-extrabold md:text-5xl text-4xl">
            Your Favorite Dishes, Delivered to Your Door
          </h1>
          <p className="text-gray-500">
            Order your favorite meals online and enjoy fresh, delicious dishes
            delivered straight to your door.
          </p>
        </div>

        {/* INPUT SEARCH AREA */}
        <div className="relative flex items-center gap-2">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search restaurant by name & city"
            className="pl-10 shadow-lg"
          />
          <Search className="text-gray-500 absolute inset-y-2 left-2" />
          <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
        </div>
      </div>

      <div>
        <img
          src={HeroImage}
          alt=""
          className="w-full max-h-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
