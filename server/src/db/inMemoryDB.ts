import { Product } from '../models/product';
import { PricingProfile } from '../models/profile';

export class InMemoryDB {
  public products: Product[] = [
    { title: 'High Garden Pinot Noir 2021', skuCode: 'HGVPIN216', brand: 'High Garden', categoryID: 'Alcoholic Beverage', subCategoryID: 'Wine', segmentID: 'Red', globalWholesalePrice: 279.06 },
    { title: 'Koyama Methode Brut Nature NV', skuCode: 'KOYBRUNV6', brand: 'Koyama Wines', categoryID: 'Alcoholic Beverage', subCategoryID: 'Wine', segmentID: 'Sparkling', globalWholesalePrice: 120 },
    { title: 'Koyama Riesling 2018', skuCode: 'KOYNR1837', brand: 'Koyama Wines', categoryID: 'Alcoholic Beverage', subCategoryID: 'Wine', segmentID: 'Port/Dessert', globalWholesalePrice: 215.04 },
    { title: 'Koyama Tussock Riesling 2019', skuCode: 'KOYRIE19', brand: 'Koyama Wines', categoryID: 'Alcoholic Beverage', subCategoryID: 'Wine', segmentID: 'White', globalWholesalePrice: 215.04 },
    { title: 'Lacourte-Godbillon Brut Cru NV', skuCode: 'LACBNATNV6', brand: 'Lacourte-Godbillon', categoryID: 'Alcoholic Beverage', subCategoryID: 'Wine', segmentID: 'Sparkling', globalWholesalePrice: 409.32 },
  ];

  public pricingProfiles: PricingProfile[] = [];
}

export const db = new InMemoryDB();
