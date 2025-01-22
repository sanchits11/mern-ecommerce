import Coupon from "../models/coupon.model.js"

export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({userId: req.user._id,isActive:true});
        res.json(coupon || null);
    } catch (error) {
        console.log("Error in getCoupon controller", error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.query;
        const coupon = await Coupon.findOne({code: code, userId: req.user._id, isActive: true});

        if(!coupon){
            return res.status(400).json({
                message: "Invalid coupon code"
            })
        }

        if(coupon.expirationDate < new Date()){
            coupon.isActive = false

            await coupon.save();
            return res.status(400).json({
                message: "Coupon has expired"
            })
        }

        res.json({
            message: "Coupon is valid",
            code: coupon.code,
            discountPercentage: coupon.discountPercentage
        })

    } catch (error) {
        console.log("Error in validateCoupon controller", error);   
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}