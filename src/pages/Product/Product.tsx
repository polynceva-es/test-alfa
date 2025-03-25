import "./Product.css"
import { useNavigate, useParams } from "react-router-dom"
import { useStore } from "../../store/store";
import { Card } from "../../components/Card/Card";

export const Product = () => {
    const products = useStore((state) => state.products)
    const param = useParams();
    const navigate = useNavigate();
    const paramId = param.id;
    const element = products.find((el) => {
        return el.id === paramId
    });
    return (
        <>
            <button onClick={() => navigate('/products')}>Back</button>
            {element ? (
                <Card element={element} />
            ) : (<></>)}
        </>
    )
}