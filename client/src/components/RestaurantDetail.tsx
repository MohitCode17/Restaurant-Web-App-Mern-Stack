import { Timer } from "lucide-react";
import { Badge } from "./ui/badge";
import AvailableMenu from "./AvailableMenu";

const RestaurantDetail = () => {
  return (
    <div className="max-w-6xl mx-auto my-10 px-2">
      <div className="w-full">
        {/* COVER IMAGE FOR RESTAURANT */}
        <div className="w-full h-32 md:h-64 lg:h-72">
          <img
            src="https://plus.unsplash.com/premium_photo-1666353535582-9268ce1a981c?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between">
          <div className="my-5">
            <h1 className="font-medium text-xl">Punjabi Rasoi</h1>
            <div className="flex flex-wrap gap-2 my-2">
              {[
                "Burger",
                "Pizza",
                "Masala Chap",
                "Paneer Tikka",
                "Chole Bhature",
                "Special Lassi",
                "Gulab Jamun",
              ].map((cuisine: string, index: number) => (
                <Badge
                  key={index}
                  className="font-medium px-2 py-1 rounded-full shadow-sm"
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
            <div className="flex md:flex-row flex-col gap-2 my-5">
              <div className="flex items-center gap-2">
                <Timer className="w-5 h-5" />
                <h1 className="flex items-center gap-2 font-medium">
                  Delivery Time: <span className="text-[#D19254]">15 mins</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        {/* AVAILABLE MENU */}
        <AvailableMenu />
      </div>
    </div>
  );
};

export default RestaurantDetail;
