import express from "express";
import { generateTestCases } from "../controllers/generateController.js";

const router = express.Router();

// Define route for generating test cases
router.post("/generate", generateTestCases);

export default router;
