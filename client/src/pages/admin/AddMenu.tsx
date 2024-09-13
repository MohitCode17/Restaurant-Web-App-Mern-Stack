import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { FormEvent, useState } from "react";
import EditMenu from "./EditMenu";
import { MenuFormType, menuSchema } from "@/schema/menuSchema";

const availableMenus = [
  {
    id: 1,
    name: "Special Biriyani",
    description:
      "Veg Biryani is a fragrant rice dish cooked with aromatic spices, mixed vegetables, and basmati rice. Slow-cooked to perfection, it's layered with flavors of saffron, herbs, and mild spices, making it a delicious and wholesome vegetarian option. Served with raita or salad",
    price: 340,
    image:
      "https://c.ndtvimg.com/2022-04/fq5cs53_biryani-doubletree-by-hilton_625x300_12_April_22.jpg",
  },
  {
    id: 2,
    name: "Paneer Tikka",
    description:
      "Paneer Tikka is a popular Indian appetizer made from marinated cubes of paneer (Indian cottage cheese) grilled to perfection. Seasoned with yogurt, aromatic spices, and herbs, it’s served with a side of mint chutney, offering a smoky and flavorful experience in every bite.",
    price: 250,
    image:
      "https://i0.wp.com/lovelaughmirch.com/wp-content/uploads/2020/01/Kesari-Paneer-Tikka-_11.jpg?resize=600%2C400",
  },
  {
    id: 3,
    name: "Special Gulab Jamun",
    description:
      "Gulab Jamun is a classic Indian dessert made from soft, deep-fried milk solids soaked in a fragrant syrup flavored with rose water and cardamom. These melt-in-your-mouth sweet dumplings are a rich and indulgent treat, perfect for any occasion.",
    price: 690,
    image:
      "https://images.jdmagicbox.com/quickquotes/listicle/listicle_1695787710623_ge29t_726x509.jpg",
  },
];

const AddMenu = () => {
  const [input, setInput] = useState<MenuFormType>({
    name: "",
    description: "",
    price: 0,
    image: undefined,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuFormType>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Partial<MenuFormType>>({});

  // HANDLE INPUT CHANGE
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({
      ...input,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  // HANDLE FORM SUBMIT
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // ERROR HANDLING
    const result = menuSchema.safeParse(input);

    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;

      setError(fieldErrors as Partial<MenuFormType>);
      return;
    }

    // API HANDLING
    console.log(input);
  };

  return (
    <div className="max-w-6xl mx-auto my-10 px-2">
      <div className="flex justify-between items-center">
        <h1 className="font-bold md:font-extrabold text-lg md:text-2xl">
          Available Menus
        </h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="rounded-full bg-orange hover:bg-hoverOrange">
              <Plus /> Add Menu
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add A New Menu</DialogTitle>
              <DialogDescription>
                Create a menu that will make your restaurant stand out.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                  placeholder="Enter menu name"
                />

                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs font-medium text-red-500">
                    {error.name}
                  </span>
                )}
              </div>

              <div>
                <Label>Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={handleInputChange}
                  placeholder="Enter menu description"
                />

                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs font-medium text-red-500">
                    {error.description}
                  </span>
                )}
              </div>

              <div>
                <Label>Price is (Rupees)</Label>
                <Input
                  type="number"
                  name="price"
                  value={input.price}
                  onChange={handleInputChange}
                  placeholder="Enter menu price"
                />

                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs font-medium text-red-500">
                    {error.price}
                  </span>
                )}
              </div>

              <div>
                <Label>Upload Menu Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setInput({
                      ...input,
                      image: e.target.files?.[0],
                    })
                  }
                  placeholder="Enter menu name"
                />

                {/* ERROR MESSAGE */}
                {error && (
                  <span className="text-xs font-medium text-red-500">
                    {error.image?.name}
                  </span>
                )}
              </div>
              <DialogFooter className="mt-5">
                {loading ? (
                  <Button disabled className="bg-orange hover:bg-hoverOrange">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="bg-orange hover:bg-hoverOrange">
                    Submit
                  </Button>
                )}
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {/* LIST OF AVAILABLE MENUS */}
      {availableMenus.map((menu: any, index: number) => (
        <div key={index} className="mt-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-lg border">
            <img
              src={menu.image}
              alt=""
              className="md:h-40 md:w-40 h-32 w-full object-cover rounded-lg"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold text-gray-800 mt-2">
                {menu.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{menu.description}</p>
              <h2 className="text-md font-semibold mt-2">
                Price: <span className="text-[#D19254]">₹{menu.price}</span>
              </h2>
            </div>
            <Button
              onClick={() => {
                setSelectedMenu(menu);
                setEditOpen(true);
              }}
              size={"sm"}
              className="bg-orange hover:bg-hoverOrange mt-2"
            >
              Edit Item
            </Button>
          </div>
        </div>
      ))}

      {/* EDIT DIALOG BOX */}
      <EditMenu
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        selectedMenu={selectedMenu}
      />
    </div>
  );
};

export default AddMenu;
