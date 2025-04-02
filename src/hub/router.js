import { Router } from 'express';
import { controller } from './controller.js';

export const router = Router();
router.post('/', controller.store);
