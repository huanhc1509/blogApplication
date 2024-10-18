import { useContext, useEffect } from "react"
import { useForm } from "react-hook-form"
import { IProduct } from "../interface/product"
import { ProductCt } from "../ProductContex"
import { useParams } from "react-router-dom"
import axios from "axios"

const Edit = () => {
    const { onEdit } = useContext(ProductCt)
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IProduct>()
    const params = useParams()
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`http://localhost:3000/products/${params.id}`)
                reset({
                    title: data.title,
                    content: data.content,
                    published_ad: data.published_ad,
                })
            } catch (error) {
                console.log(error);
            }
        })()
    }, [params.id, reset])
    const onSubmit = (product: IProduct) => {
        product.published_ad = product.published_ad || new Date().toISOString();
        onEdit(product, params.id)
    }

    return (
        <div className='max-w-screen-md flex flex-col justify-center mt-8 mx-auto gap-8'>
            <h1 className='text-4xl font-bold '>Sửa sản phẩm</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input type="text" className="w-full px-2 py-1.5 border-2" placeholder="Nhập tiêu đề" {...register("title", { required: true, minLength: 6 })} />
                {(errors.title) && <span className="text-red-500">Không được để trống</span>}
                <textarea className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Nhập nội dung"
                    {...register("content", { required: true, min: 0 })} />
                {(errors.content) && <span className="text-red-500">Không được để trống</span>}
                <input
                    type="date"
                    className="w-full px-2 py-1.5 border-2"
                    {...register("published_ad")}
                />
                <div className="text-center">
                    <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-red-500 text-white rounded-md w-32">Sửa</button>
                </div>
            </form>
        </div>
    )
}

export default Edit