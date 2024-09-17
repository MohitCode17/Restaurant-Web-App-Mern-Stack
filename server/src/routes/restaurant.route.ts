import express from "express";
import { authenticated } from "../middlewares/authenticated";
import {
  handleCreateRestaurant,
  handleGetRestaurant,
  handleGetRestaurantOrder,
  handleUpdateRestaurant,
} from "../controllers/restaurant.controller";

const router = express.Router();

// CREATE RESTAURANT ROUTE
router.post("/", authenticated, handleCreateRestaurant);

// GET RESTAURANT ROUTE
router.get("/", authenticated, handleGetRestaurant);

// UPDATE RESTAURANT ROUTE
router.put("/", authenticated, handleUpdateRestaurant);

// GET ORDERS ROUTE
router.get("/order", authenticated, handleGetRestaurantOrder);

export default router;
