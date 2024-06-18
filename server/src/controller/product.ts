import { Router, Request, Response } from 'express';
import { db } from '../db/inMemoryDB';

export const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     responses:
 *       200:
 *         description: A list of products
 */
router.get('/', (req: Request, res: Response) => {
  res.json(db.products);
});
