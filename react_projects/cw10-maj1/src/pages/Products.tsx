import { useEffect, useState } from "react";
import type { Product } from "../Models/ProductsType";
import { loadData } from "../Models/ProductService";
const api_url = "http://localhost:3000/product";
const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    //useEffect(()=>{});
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await loadData(api_url);
                console.log("Fetched products:", productsData);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2>Products</h2>

        </div>
    )
}

export default Products