import { StoreApiResponse } from "@/types/Product.types";

export const fetchProducts = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data: StoreApiResponse[] = await res.json();

    return data;
}