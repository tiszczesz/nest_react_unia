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
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Cena</th>
                        <th>Data produkcji</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.name}</td>
                            <td style={{ textAlign: "right" }}>{product.price}</td>
                            <td>{new Date(product.date).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Products