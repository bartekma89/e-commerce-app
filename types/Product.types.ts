import { MDXRemoteSerializeResult } from "next-mdx-remote";

export type MarkdownResultType = MDXRemoteSerializeResult<
  Record<string, unknown>
>;

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
