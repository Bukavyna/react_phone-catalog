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
  description: ProductDescriptionBlock[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  cell?: string[];
  year?: number;
  camera?: string;
  zoom?: string;
}
