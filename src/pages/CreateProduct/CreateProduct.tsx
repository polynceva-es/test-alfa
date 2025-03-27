import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import './CreateProduct.css'
import { DataType, useStore } from '../../store/store';

export const CreateProduct = () => {
    const navigate = useNavigate();
    const addNew = useStore((state) => state.addNew)

    const {
        register,
        handleSubmit,
    } = useForm<DataType>()
    const onSubmit: SubmitHandler<DataType> = (data) => { addNew(data); navigate('/products') }


    return (
        <section>
            <h1>Create new Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <button type='submit'>Save new Product</button>
            </form>
        </section>
    )
}