import "./Products.css";
import { useState } from "react";
import { ProductType, useStore } from "../../store/store";
import { Card } from "../../components/Card/Card";
import { useNavigate } from "react-router-dom";

export const Products = () => {
    const products = useStore((state) => state.products);
    let isLikedProduct: ProductType[] = []
    const [isLiked, setIsLiked] = useState(false);
    const navigate = useNavigate();

    if (isLiked) {
        isLikedProduct = (products.filter((el) => el.isLiked === true))
    }

    return (
        <div className="products">
            <label className="checkbox-ios">
                <input type="checkbox" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setIsLiked(event.target.checked)
                }} />
                <span className="checkbox-ios-switch"></span>
                Selected
            </label>
            <button onClick={() => navigate('/create-product')}>Add new</button>
            <ul className="products__list">
                {isLiked ? (
                    isLikedProduct?.map((el) => {
                        return (
                            <li key={el.id}><Card element={el} /></li>
                        )
                    })
                ) : (
                    products?.map((el) => {
                        return (
                            <li key={el.id}><Card element={el} /></li>
                        )
                    })
                )
                }
            </ul>
        </div>
    )
}