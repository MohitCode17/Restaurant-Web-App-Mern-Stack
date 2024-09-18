import express from "express";
import { authenticated } from "../middlewares/authenticated";
import {
  handleCreateMenu,
  handleEditMenu,
} from "../controllers/menu.controller";

const router = express.Router();

// CREATE MENU ROUTE
router.post("/", authenticated, handleCreateMenu);

// EDIT MENU ROUTE
router.put("/:id", authenticated, handleEditMenu);

export default router;
