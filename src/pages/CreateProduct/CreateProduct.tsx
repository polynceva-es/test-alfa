import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import './CreateProduct.css'

export const CreateProduct = () => {
    const navigate = useNavigate();
    type Input = {
        fullName: string,
        id: number,
        categoryFullName: string,
        awardYear: string,
        motivation: string
    }

    const {
        register,
        handleSubmit,
    } = useForm<Input>()
    const onSubmit: SubmitHandler<Input> = (data) => console.log(data)


    return (
        <>
            <button onClick={() => navigate('/products')}>Back to Products</button>
            <div>Create new Product</div>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label>
                    fullName
                    <input type='text' {...register("fullName", { required: true })} />
                </label>
                <label>
                    laureates: id
                    <input type='text' {...register("id", { required: true })} />
                </label>

                <label>
                    categoryFullName
                    <input type='text' {...register("categoryFullName", { required: true })} />
                </label>
                <label>
                    awardYear
                    <input type='text' {...register("awardYear", { required: true })} />
                </label>
                <label>
                    motivation
                    <input type='text' {...register("motivation", { required: true })} />
                </label>
                <button type='submit'>Save new Product</button>
            </form>
        </>
    )
}