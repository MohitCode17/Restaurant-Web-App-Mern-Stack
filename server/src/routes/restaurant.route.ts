import express from "express";
import { authenticated } from "../middlewares/authenticated";
import {
  handleCreateRestaurant,
  handleGetRestaurant,
  handleGetRestaurantOrder,
  handleGetSingleRestaurant,
  handleUpdateOrderStatus,
  handleUpdateRestaurant,
  searchRestaurant,
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

// UPDATE ORDER STATUS ROUTE
router.put("/order/:orderId/status", authenticated, handleUpdateOrderStatus);

// SEARCH ROUTE
router.get("/search/:searchText", authenticated, searchRestaurant);

// GET SINGLE RESTAURANT ROUTE
router.get("/:id", authenticated, handleGetSingleRestaurant);

export default router;
