import express from 'express'
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrdertoDelivered, updateOrdertoPaid } from '../controllers/orderController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders)
router.get("/myorders", protect, getMyOrders)
router.get("/:id", protect, getOrderById)
router.put("/:id/pay", protect, updateOrdertoPaid)
router.put("/:id/delivered", protect, updateOrdertoDelivered)


export default router;