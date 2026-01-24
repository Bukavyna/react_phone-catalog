export interface ProductDescriptionBlock {
  title: string;
  text: string[];
}

export interface ProductDetails {
  id: string;
  category: string;
  namespaceId: string;
  name: string;

  priceRegular: number;
  priceDiscount: number;

  capacity: string;
  capacityAvailable: string[];

  color: string;
  colorsAvailable: string[];

  images: string[];

  screen: string;
  ram: string;
  year: number;

  description: ProductDescriptionBlock[];
}
