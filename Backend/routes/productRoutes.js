import express from 'express'
import { getProducts } from '../controllers/productController.js';
import { getProductById } from '../controllers/productController.js';

const router = express.Router();


router.route("/").get(getProducts)

router.route("/:id").get(getProductById)

export default router;