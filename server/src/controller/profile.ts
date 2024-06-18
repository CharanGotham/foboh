import { Router, Request, Response } from 'express';
import { db } from '../db/inMemoryDB';
import { PricingProfile } from '../models/profile';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../models/product';

export const router = Router();

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Retrieve a list of pricing profiles
 *     responses:
 *       200:
 *         description: A list of pricing profiles
 */
router.get('/', (req: Request, res: Response) => {
  res.json(db.pricingProfiles);
});

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Create a new pricing profile
 *     parameters:
 *       - in: body
 *         name: profile
 *         description: The profile to create
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - adjustments
 *           properties:
 *             name:
 *               type: string
 *             basedOnProfileId:
 *               type: string
 *             adjustments:
 *               type: object
 *               additionalProperties:
 *                 type: object
 *                 properties:
 *                   adjustmentType:
 *                     type: string
 *                     enum: [fixed, dynamic]
 *                   value:
 *                     type: number
 *     responses:
 *       201:
 *         description: The created profile
 */
router.post('/', (req: Request, res: Response) => {
  const { name, basedOnProfileId, adjustments } = req.body;

  const newProfile: PricingProfile = {
    id: uuidv4(),
    name,
    basedOnProfileId,
    adjustments,
  };

  db.pricingProfiles.push(newProfile);
  res.status(201).json(newProfile);
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Retrieve a single pricing profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile id
 *     responses:
 *       200:
 *         description: A single pricing profile
 *       404:
 *         description: Profile not found
 */
router.get('/:id', (req: Request, res: Response) => {
  const profile = db.pricingProfiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }
  res.json(profile);
});

/**
 * @swagger
 * /profiles/{id}/calculate:
 *   post:
 *     summary: Calculate adjusted prices for a pricing profile
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The profile id
 *     responses:
 *       200:
 *         description: Calculated prices
 *       404:
 *         description: Profile not found
 */
router.post('/:id/calculate', (req: Request, res: Response) => {
  const profile = db.pricingProfiles.find(p => p.id === req.params.id);
  if (!profile) {
    return res.status(404).json({ message: 'Profile not found' });
  }

  const basedOnProfile = profile.basedOnProfileId ? db.pricingProfiles.find(p => p.id === profile.basedOnProfileId) : null;
  const basePrices = basedOnProfile ? basedOnProfile.adjustments : {};

  const calculatedPrices = db.products.map((product: Product) => {
    const basePrice = basePrices[product.skuCode]?.value || product.globalWholesalePrice;
    const adjustment = profile.adjustments[product.skuCode];

    if (adjustment) {
      let adjustedPrice: number;
      if (adjustment.adjustmentType === 'fixed') {
        adjustedPrice = adjustment.isIncrease ? basePrice + adjustment.value : basePrice - adjustment.value;
      } else {
        const adjustmentValue = basePrice * (adjustment.value / 100);
        adjustedPrice = adjustment.isIncrease ? basePrice + adjustmentValue : basePrice - adjustmentValue;
      }
      return { ...product, adjustedPrice };
    }

    return { ...product, adjustedPrice: basePrice };
  });

  res.json(calculatedPrices);
});
