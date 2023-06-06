import express, { Router } from 'express';
import { generateQuery } from '../controllers/generateController';

const router: Router = express.Router();

router.post('/', generateQuery);

export default router;
