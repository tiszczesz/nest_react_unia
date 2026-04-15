import { type Product } from "./models/productModel";

const parseJsonBody = async <T>(response: Response): Promise<T | null> => {
    const bodyText = await response.text();

    // Some successful responses (e.g. 201/204) can have an empty body.
    if (!bodyText.trim()) {
        return null;
    }

    try {
        return JSON.parse(bodyText) as T;
    } catch {
        throw new Error('Invalid JSON response from server.');
    }
};

export const loadData = async (url: string): Promise<Product[]> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await parseJsonBody<Product[]>(response);
    return products ?? [];
}
export const saveData = async (url: string, product: Product): Promise<Product | null> => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return parseJsonBody<Product>(response);
}

export const deleteData = async (url: string): Promise<void> => {
    const response = await fetch(url, {
        method: 'DELETE'
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
}