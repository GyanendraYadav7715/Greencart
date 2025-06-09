import express from "express";
import {
    loginSeller,
    logoutSeller,
    isSellerAuth
    
} from "../controllers/sellerController.js";

import { authSeller } from "../middlewares/authSeller.js";

const router = express.Router();

// Public route for hardcoded seller login
router.post("/login", loginSeller);

// Private route to logout seller
router.post("/logout", authSeller, logoutSeller);
router.get("/is-auth",authSeller, isSellerAuth)

 
export default router;
