export interface PricingAdjustment {
    adjustmentType: 'fixed' | 'dynamic';
    value: number;
    isIncrease: boolean;
}

export interface PricingProfile {
    id: string;
    name: string;
    basedOnProfileId?: string;
    adjustments: { [productId: string]: PricingAdjustment };
}
