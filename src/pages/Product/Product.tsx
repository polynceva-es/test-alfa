import "./Product.css"
import { useParams } from "react-router-dom"
import { DataType, useStore } from "../../store/store";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"

export const Product = () => {
    const [isEdit, setIsEdit] = useState(false);
    const products = useStore((state) => state.products)
    const param = useParams();
    const paramId = param.id;
    const element = products.find((el) => {
        return el.id === paramId
    });
    const handleEdit = () => {
        setIsEdit(!isEdit);
    }

    const update = useStore((state) => state.update)

    const {
        register,
        handleSubmit,
    } = useForm<DataType>({mode: "onChange", defaultValues: {
        awardYear: element ? element.awardYear : '',
        category: element ? element.category : '',
        laureates: element ? element.laureates : '',
        motivation: element ? element.motivation: '',
        url: element ? element.url : ''
    }})
    const onSubmit: SubmitHandler<DataType> = (data) => { update(data, paramId!); handleEdit() }
    return (
        <>
            {element ? (
                <div className="product__container">
                    <section className="product">
                        <h1 className="product__title">{element.laureates}</h1>
                        <img className="product__image" src={element.url} alt="image" />
                        <p>{element.category}</p>
                        <p>{element.awardYear}</p>
                        <h3 className="product__subtitle">{element.motivation}</h3>
                        <button onClick={handleEdit}>Edit Product</button>
                    </section>
                    {isEdit ? <section>
                        <h2>Update Product</h2>
                        <form className="product__form" onSubmit={handleSubmit(onSubmit)}>
                            <label>
                                awardYear
                                <input type='text' {...register("awardYear", { required: true })} />
                            </label>
                            <label>
                                category
                                <input type='text' {...register("category", { required: true })} />
                            </label>
                            <label>
                                laureates
                                <input type='text' {...register("laureates", { required: true })} />
                            </label>

                            <label>
                                motivation
                                <input type='text' {...register("motivation", { required: true })} />
                            </label>
                            <label>
                                imageUrl
                                <input type='text' {...register("url", { required: true })} />
                            </label>
                            <button type='submit'>Save Changes</button>
                        </form>
                    </section> : <></>}
                </div>
            ) : (<></>)}
        </>
    )
}