export interface Category {
  path: string;
  title: string;
  categoryName: string;
  apiEndpoint: string;
}

export const CATEGORIES: Category[] = [
  {
    path: '/phones',
    title: 'phones',
    categoryName: 'Mobile Phones',
    apiEndpoint: 'phones',
  },
  {
    path: '/tablets',
    title: 'tablets',
    categoryName: 'Tablets',
    apiEndpoint: 'tablets',
  },
  {
    path: '/accessories',
    title: 'accessories',
    categoryName: 'Accessories',
    apiEndpoint: 'accessories',
  },
];
