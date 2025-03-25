import "./Card.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ProductType, useStore } from "../../store/store"

export const Card = (props: { element: ProductType; }) => {
    const element = props.element;
    const isLiked = element.isLiked;
    const navigate = useNavigate();
    const location = useLocation();
    const liked = useStore((state) => state.liked);
    const deleted = useStore((state) => state.deleted);
    const handleLike = (id: string) => {
        liked(id)
    }
    const handleDelete = (id: string) => {
        deleted(id)
    }
    const likeButtonClassName = `card__btn card__like ${isLiked ? 'card__like_isliked' : ''}`
    return (
        <div className="card">
            <div className="card__btn-container">
                <button className={likeButtonClassName} onClick={() => handleLike(element.id)}/>
                <button className="card__btn card__delete" onClick={() => handleDelete(element.id)}/>
            </div>
            <div onClick={() => navigate(`/products/${element.id}`)}> 
                <h1 className="card__title">{element.laureates[0]?.fullName?.en}</h1>
                <h2>{element.laureates[0]?.orgName?.en}</h2>
                <h3>{element.laureates[0].id}</h3>
                <p>{element.categoryFullName.en}</p>
                <p>{element.awardYear}</p>
                {(location.pathname === '/products') ? <></> : <h3 className="card__title">{element.laureates[0].motivation.en}</h3>}
            </div>

        </div>
    )
}