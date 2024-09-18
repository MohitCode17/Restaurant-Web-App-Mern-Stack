import { Request, Response } from "express";
import Menu from "../models/menu.model";
import Restaurant from "../models/restaurant.model";
import mongoose from "mongoose";

// CREATE MENU CONTROLLER
export const handleCreateMenu = async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    // const file = req.file; TO BE IMPLEMENT
    // if (!file)
    //   return res.status(400).json({
    //     success: false,
    //     message: "Menu image is required",
    //   });

    // const imageUrl = await uploadImageOnCloudinary();

    const menu: any = await Menu.create({
      name,
      description,
      price,
      // image: imageUrl,
    });

    const restaurant = await Restaurant.findOne({ user: req.id });

    if (restaurant) {
      (restaurant.menus as mongoose.Schema.Types.ObjectId[]).push(menu._id);
      await restaurant.save();
    }

    return res.status(201).json({
      success: true,
      message: "Menu added successfully",
      menu,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
