import "./Products.css";
import { ProductType, useStore } from "../../store/store";
import { Card } from "../../components/Card/Card";
import { useState } from "react";

type ProductsProps = {
    isLiked: boolean
}

export const Products = ({isLiked}: ProductsProps) => {
    const products = useStore((state) => state.products);
    let isLikedProduct: ProductType[] = [];
    const [pageNum, setPageNum] = useState(1);


    if (isLiked) {
        isLikedProduct = (products.filter((el) => el.isLiked === true))
    }

    const handleShowMore = () => {
        setPageNum((pageNum)=>pageNum + 1)
    }

    return (
        <div className="products">
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
            <button onClick={handleShowMore}>Show more cards</button>
            <p>{pageNum}</p>
        </div>
    )
}