export interface ShopLink {
  href: string;
  rel: string;
  type: string;
}

export interface ShopCategory {
  id: string;
  links: ShopLink[];
  name: string;
  productCount: number;
  subCategories: ShopCategory[];
}

export type ShopCountry = 'US' | 'CA' | 'GB' | 'AU' | 'TW' | 'HK' | 'SG' | 'MY';

export interface ShopProductImageSize {
  height: number;
  width: number;
  url: string;
}

export interface ShopProductImage {
  caption: string;
  sizes: ShopProductImageSize[];
}

export interface ShopProduct {
  brand: string;
  id: number;
  image: ShopProductImage;
  links: ShopLink[];
  maximumBv: number;
  maximumCashback: number;
  maximumCashbackString: string;
  maximumCiPoints: number;
  maximumIbv: number;
  maximumPrice: number;
  maximumPriceString: string;
  minimumPrice: number;
  minimumPriceString: string;
  name: string;
  referralUrl: string;
  shortDescription: string;
}

export interface ShopPriceRange {
  id: string;
  maximumPrice: number;
  maximumPriceString: string;
  minimumPrice: number;
  minimumPriceString: string;
  productCount: number;
}

export interface ShopProductCategory {
  id: string;
  name: string;
  productsCount: number;
}

export interface ShopProductBrand {
  id: string;
  name: string;
  productsCount: number;
}

export interface ShopProductSeller {
  id: string;
  name: string;
  productsCount: number;
}

export interface ShopProductsResponse {
  brands: ShopProductBrand[];
  categories: ShopProductCategory[];
  products: ShopProduct[];
  numberOfProducts: number;
  sellers: ShopProductSeller[];
}

export interface ShopProductOption {
  autoShip: boolean;
  bv: number;
  cashback: number;
  cashbackString: string;
  ciPoints: number;
  freeShipping: boolean;
  ibv: number;
  name: string;
  price: number;
  priceString: string;
  sku: string;
}

/**
 * API's output type from `products/${productId}`
 */
export interface ShopProductFull {
  brand: string;
  catalogName: string;
  category: {
    id: number; // Should be a string?!
    name: string;
  };
  description: string;
  id: number; // Should be also a string?
  image: ShopProductImage;
  links: ShopLink[];
  name: string;
  onSale: boolean;
  options: ShopProductOption[];
  referralPageUrl: string;
  reviewData: {
    count: string;
    rating: number;
  };
  shortDescription: string;
}
