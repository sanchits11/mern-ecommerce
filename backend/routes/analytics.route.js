import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsData, getDailySalesData } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, async (req, res) => {
    try {
        const analyticsData = getAnalyticsData();

        const startDate = new Date();
        const endDate = new Date(endDate.getTime() - 7*24*60*60*1000);

        const dailySalesData = await getDailySalesData(startDate, endDate);

        res.status(200).json({
            analyticsData,
            dailySalesData
        });

    } catch (error) {
        console.error("Error getting analytics data route", error);
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});

export default router;