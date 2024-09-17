import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";

// CREATE A RESTAURANT CONTROLLER
export const handleCreateRestaurant = async (req: Request, res: Response) => {
  try {
    // GETTING DATA FOR CREATING A RESTAURANT
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;

    // const file = req.file; // TO BE IMPLEMENT MULTER CONFIG

    // FIND IF USER HAS ALREADY CREATED A RESTAURANT
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (restaurant)
      return res.status(400).json({
        success: false,
        message: "Restaurant already exist.",
      });

    // if (!file)
    //   return res.status(400).json({
    //     success: false,
    //     message: "Restaurant image is required",
    //   });

    // TO BE CONFIG FOR CLOUDINARY
    // const imageUrl = await uploadImageOnCloudinary();

    // CREATE NEW RESTAURANT TO DATABASE
    await Restaurant.create({
      user: req.id,
      restaurantName,
      city,
      country,
      deliveryTime,
      cuisines: JSON.parse(cuisines),
      // imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Restaurant created.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
