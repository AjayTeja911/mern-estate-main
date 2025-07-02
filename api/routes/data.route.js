import express from 'express';
import { getRegionalPrices } from '../controllers/data.controller.js';

const router = express.Router();
router.get('/regional-prices', getRegionalPrices);
export default router;