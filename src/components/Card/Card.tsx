import "./Card.css";
import { useNavigate } from "react-router-dom";
import { ProductType, useStore } from "../../store/store"

export const Card = (props: { element: ProductType; }) => {
    const element = props.element;
    const isLiked = element.isLiked;
    const navigate = useNavigate();
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
                <button className={likeButtonClassName} onClick={() => handleLike(element.id)} />
                <button className="card__btn card__delete" onClick={() => handleDelete(element.id)} />
            </div>
            <div className="card__info-container" onClick={() => navigate(`/products/${element.id}`)}>
                <h1 className="card__title">{element.laureates}</h1>
                <p>{element.category}</p>
                <p>{element.awardYear}</p>
                <img className="card__image" src={element.url} alt="image" />
            </div>
        </div>
    )
}