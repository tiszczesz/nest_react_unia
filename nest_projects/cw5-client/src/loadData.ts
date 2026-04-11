import {type Product } from "./models/productModel";
export const loadData = async (url: string): Promise<Product[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<Product[]>;
}