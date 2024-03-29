import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MarkdownResultType = MDXRemoteSerializeResult<
  Record<string, unknown>
>;

export interface ProductDetails {
  title: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
  rating: number;
  price: number;
  category?: string;
  id: string;
  slug: string;
  longDescription: MarkdownResultType;
}

export interface StoreApiResponse {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  longDescription: string;
  rating: {
    rate: number;
    count: number;
  };
}
