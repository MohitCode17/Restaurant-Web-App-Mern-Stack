import {
  Loader2,
  LocateIcon,
  Mail,
  MapIcon,
  MapPinnedIcon,
  Plus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FormEvent, useRef, useState } from "react";
import { Button } from "./ui/button";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    fullname: "",
    email: "",
    address: "",
    city: "",
    country: "",
    profilePicture: "",
  });
  const [selectedProfile, setSelectedProfile] = useState<string>(
    profileData.profilePicture || ""
  );
  const imageRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedProfile(result);
        setProfileData((prev) => ({
          ...prev,
          profilePicture: result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(profileData);
  };

  return (
    <form className="max-w-2xl mx-auto px-2 mt-8 mb-5" onSubmit={handleSubmit}>
      {/* PROFILE IMAGE AND PROFILE NAME */}
      <div className="flex items-center gap-2">
        <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
          <AvatarImage
            src={selectedProfile || "https://github.com/shadcn.png"}
          />
          <AvatarFallback>MG</AvatarFallback>
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            onClick={() => imageRef.current?.click()}
            className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer"
          >
            <Plus className="text-white w-8 h-8" />
          </div>
        </Avatar>
        <Input
          type="text"
          name="fullname"
          className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent"
          value={profileData.fullname}
          onChange={handleInputChange}
        />
      </div>

      {/* PROFILE CONTENT */}
      <div className="grid grid-cols-1 gap-3 my-10">
        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <Mail className="text-gray-500" />
          <div className="w-full">
            <Label>Email</Label>
            <input
              type="text"
              name="email"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              value={profileData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <LocateIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Address</Label>
            <input
              type="text"
              name="address"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              value={profileData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapIcon className="text-gray-500" />
          <div className="w-full">
            <Label>City</Label>
            <input
              type="text"
              name="city"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              value={profileData.city}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">
          <MapPinnedIcon className="text-gray-500" />
          <div className="w-full">
            <Label>Country</Label>
            <input
              type="text"
              name="country"
              className="w-full text-gray-600 bg-transparent focus-visible:ring-0 focus-visible:border-transparent outline-none border-none"
              value={profileData.country}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        {loading ? (
          <Button
            disabled={loading}
            className="w-full bg-orange hover:bg-hoverOrange"
          >
            <Loader2 className="mr-2 w-4 h-4 animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full bg-orange hover:bg-hoverOrange"
          >
            Update
          </Button>
        )}
      </div>
    </form>
  );
};

export default Profile;
