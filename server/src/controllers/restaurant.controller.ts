import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import Order from "../models/order.model";

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

// GET RESTAURANT CONTROLLER
export const handleGetRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById({ user: req.id }).populate(
      "menus"
    );

    if (!restaurant)
      return res.status(400).json({
        success: false,
        message: "Restaurant not found.",
      });

    return res.status(200).json({ success: true, restaurant });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE RESTAURANT CONTROLLER
export const handleUpdateRestaurant = async (req: Request, res: Response) => {
  try {
    // GETTING DATA OF RESTAURANT
    const { restaurantName, city, country, deliveryTime, cuisines } = req.body;

    // const file = req.file; // TO BE IMPLEMENT MULTER CONFIG

    // FIND RESTAURANT
    const restaurant = await Restaurant.findOne({ user: req.id });

    if (!restaurant)
      return res.status(400).json({
        success: false,
        message: "Restaurant not found.",
      });

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryTime = deliveryTime;
    restaurant.cuisines = JSON.parse(cuisines);

    // if(file) {
    //     const imageUrl = await uploadImageOnCloudinary();
    //     restaurant.imageUrl = imageUrl;
    // }

    await restaurant.save();
    return res.status(200).json({
      success: true,
      message: "Restaurant updated.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET RESTAURANT ORDERS
export const handleGetRestaurantOrder = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findById({ user: req.id });

    if (!restaurant)
      return res.status(400).json({
        success: false,
        message: "Restaurant not found",
      });

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// UPDATE ORDER STATUS CONTROLLER
export const handleUpdateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderId);

    if (!order)
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });

    order.status = status;
    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order status updated",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// SEARCH RESTAURANT CONTROLLER
export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const searchText = req.params.searchText || "";
    const searchQuery = req.query.searchQuery || "";

    const selectedCuisines = ((req.query.selectedCuisines as string) || "")
      .split(",")
      .filter((cuisine) => cuisine);

    const query: any = {};

    if (searchText) {
      query.$or = [
        { restaurantName: { $regex: searchText, $options: "i" } },
        { city: { $regex: searchText, $options: "i" } },
        { country: { $regex: searchText, $options: "i" } },
      ];
    }

    if (searchQuery) {
      query.$or = [
        { restaurantName: { $regex: searchQuery, $options: "i" } },
        { cuisines: { $regex: searchQuery, $options: "i" } },
      ];
    }

    if (selectedCuisines.length > 0) {
      query.cuisines = { $in: selectedCuisines };
    }

    const restaurants = await Restaurant.find(query);
    return res.status(200).json({
      success: true,
      data: restaurants,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// GET SINGLE RESTAURANT CONTROLLER
export const handleGetSingleRestaurant = async (
  req: Request,
  res: Response
) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findById(restaurantId).populate({
      path: "menus",
      options: { createdAt: -1 },
    });

    if (!restaurant)
      return res.status(400).json({
        success: false,
        message: "Restaurant not found.",
      });

    return res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
