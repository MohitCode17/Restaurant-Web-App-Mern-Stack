import { useState } from "react";
import Filter from "./Filter";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="max-w-7xl mx-auto my-10 px-2">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* FILTER SECTION */}
        <Filter />

        {/* MAIN CONTENT */}
        <div className="flex-1">
          {/* SEARCH INPUT */}
          <div className="flex items-center gap-2">
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by restaurant & cuisines"
            />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>

          {/* SEARCHED ITEM */}
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">3 Search result found</h1>

              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {["Burger", "Pizza", "Punjabi Rasoi"].map(
                  (searchItem: string, index: number) => (
                    <div
                      key={index}
                      className="relative inline-flex items-center max-w-full"
                    >
                      <Badge
                        className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                        variant="outline"
                      >
                        {searchItem}
                      </Badge>
                      <X
                        size={16}
                        className="absolute text-[#D19254] right-1 hover:cursor-pointer"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* RESTAURANT CARDS */}
            <div className="grid md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Card
                  key={index}
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  <div className="relative">
                    <AspectRatio ratio={16 / 7}>
                      <img
                        src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                    <div className="absolute top-2 left-2 bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Featured
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Punjab Rasoi
                    </h1>

                    <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400 gap-1">
                      <MapPin size={16} />
                      <p className="text-sm">
                        <span className="font-medium">New Delhi</span>
                      </p>
                    </div>

                    <div className="mt-2 flex items-center text-gray-600 dark:text-gray-400 gap-1">
                      <Globe size={16} />
                      <p className="text-sm">
                        <span className="font-medium">India</span>
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4 flex-wrap">
                      {[
                        "Burger",
                        "Pizza",
                        "Masala Chap",
                        "Paneer Tikka",
                        "Chole Bhature",
                        "Special Lassi",
                        "Gulab Jamun",
                      ]
                        .slice(0, 4)
                        .map((cuisine: string, index: number) => (
                          <Badge
                            key={index}
                            className="font-medium px-2 py-1 rounded-full shadow-sm"
                          >
                            {cuisine}
                          </Badge>
                        ))}
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 border-t dark:border-t-gray-700 border-t-gray-100 text-white flex justify-end">
                    <Link to={`/restaurant/${123}`}>
                      <Button className="bg-orange hover:bg-hoverOrange font-semibold py-2 px-4 rounded-full shadow-md transition-colors duration-200">
                        View Menu
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
