export interface ShopLink {
  href: string;
  rel: string;
  type: string;
}

export interface ShopCategory {
  id: string;
  links: ShopLink[];
  name: String;
  productCount: number;
  subCategories: ShopCategory[];
}
