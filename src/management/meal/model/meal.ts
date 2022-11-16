export interface Meal {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  allergens: string[];
}
