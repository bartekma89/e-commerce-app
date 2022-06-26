export interface ProductDetails {
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: {
    rate: number;
    count: number;
  };
  category: string;
  id: number;
}

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
