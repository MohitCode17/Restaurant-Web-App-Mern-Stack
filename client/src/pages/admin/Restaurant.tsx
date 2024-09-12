import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  restaurantFormSchema,
  RestaurantFormType,
} from "@/schema/restaurantSchema";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const Restaurant = () => {
  const [input, setInput] = useState<RestaurantFormType>({
    restaurantName: "",
    city: "",
    country: "",
    deliveryTime: 0,
    cuisines: [],
    imageFile: undefined,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Partial<RestaurantFormType>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value } = e.target;

    setInput({ ...input, [name]: type === "number" ? Number(value) : value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // VALIDATION
    const result = restaurantFormSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;

      setError(fieldErrors as Partial<RestaurantFormType>);
      return;
    }

    // API IMPLEMENTATION
    console.log(input);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-2">
      <div>
        <div>
          <h1 className="font-semibold text-2xl mb-5">Add Restaurants</h1>

          <form onSubmit={handleSubmit}>
            <div className="md:grid grid-cols-2 gap-5 space-y-2 md:space-y-0">
              <div>
                <Label>Restaurant Name</Label>
                <Input
                  type="text"
                  name="restaurantName"
                  value={input.restaurantName}
                  onChange={handleInputChange}
                  placeholder="Enter your restaurant name"
                />
                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs text-red-500 font-bold">
                    {error.restaurantName}
                  </span>
                )}
              </div>

              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={input.city}
                  onChange={handleInputChange}
                  placeholder="New Delhi"
                />
                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs text-red-500 font-bold">
                    {error.city}
                  </span>
                )}
              </div>

              <div>
                <Label>Country</Label>
                <Input
                  type="text"
                  name="country"
                  value={input.country}
                  onChange={handleInputChange}
                  placeholder="India"
                />
                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs text-red-500 font-bold">
                    {error.country}
                  </span>
                )}
              </div>

              <div>
                <Label>Estimated Delivery Time(minutes)</Label>
                <Input
                  type="number"
                  name="deliveryTime"
                  value={input.deliveryTime}
                  onChange={handleInputChange}
                />
                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs text-red-500 font-bold">
                    {error.deliveryTime}
                  </span>
                )}
              </div>

              <div>
                <Label>Cuisines</Label>
                <Input
                  type="text"
                  name="cuisines"
                  value={input.cuisines}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      cuisines: e.target.value.split(","),
                    })
                  }
                  placeholder="Dal makhni, Paneer tikka, Gulab jamun"
                />
                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs text-red-500 font-bold">
                    {error.cuisines}
                  </span>
                )}
              </div>

              <div>
                <Label>Upload Restaurant Banner</Label>
                <Input
                  type="file"
                  name="imageFile"
                  accept="image/*"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      imageFile: e.target.files?.[0] || undefined,
                    })
                  }
                />
                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs text-red-500 font-bold">
                    {error.imageFile?.name}
                  </span>
                )}
              </div>
            </div>
            <div className="my-5 w-fit">
              {loading ? (
                <Button disabled className="bg-orange hover:bg-hoverOrange">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-orange hover:bg-hoverOrange">
                  Add Your Restaurant
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Restaurant;
