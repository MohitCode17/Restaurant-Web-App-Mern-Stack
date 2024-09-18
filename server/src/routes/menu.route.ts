import express from "express";
import { authenticated } from "../middlewares/authenticated";
import { handleCreateMenu } from "../controllers/menu.controller";

const router = express.Router();

// CREATE MENU ROUTE
router.post("/", authenticated, handleCreateMenu);

// EDIT MENU ROUTE

export default router;
