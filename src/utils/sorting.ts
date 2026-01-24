import { Product, SortType } from '../types/product.types';

export const sortProducts = (
  products: Product[],
  sortType: SortType,
): Product[] => {
  const sorted = [...products];

  switch (sortType) {
    case SortType.Alphabetically:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case SortType.Cheapest:
      return sorted.sort((a, b) => a.priceDiscount - b.priceDiscount);

    case SortType.HotPrices:
      return sorted.sort((a, b) => {
        const discountA = a.priceRegular - a.priceDiscount;
        const discountB = b.priceRegular - b.priceDiscount;

        return discountB - discountA;
      });

    // case SortType.Newest:
    //   return sorted
  }

  return sorted;
};
