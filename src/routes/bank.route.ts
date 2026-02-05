import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import {
  createBank,
  deleteBank,
  getBankById,
  getBanks,
  updateBank,
} from "../controllers/bank.controller";

const router = Router();

router.post("/", authenticate, createBank);
router.get("/", getBanks);
router.get("/:id", getBankById);
router.put("/:id", authenticate, updateBank);
router.delete("/:id", authenticate, deleteBank);

export default router;
