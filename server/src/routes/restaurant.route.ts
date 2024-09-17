import express from "express";
import { authenticated } from "../middlewares/authenticated";
import { handleCreateRestaurant } from "../controllers/restaurant.controller";

const router = express.Router();

// CREATE RESTAURANT ROUTE
router.post("/", authenticated, handleCreateRestaurant);

export default router;
