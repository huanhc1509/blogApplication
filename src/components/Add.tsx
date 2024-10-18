import { useContext } from "react";
import { useForm } from "react-hook-form";
import { IProduct } from "../interface/product";
import { ProductCt } from "../ProductContex";
import { Link } from "react-router-dom";

const Add = () => {
    const { onAdd } = useContext(ProductCt);
    const { register, handleSubmit, formState: { errors } } = useForm<IProduct>();

    const onSubmit = (product: IProduct) => {
        product.published_ad = product.published_ad || new Date().toISOString();
        onAdd(product);
    };

    return (
        <div className='max-w-screen-md flex flex-col justify-center mt-8 mx-auto gap-8'>
            <h1 className='text-4xl font-bold '>Thêm sản phẩm</h1>
            <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <input
                    type="text"
                    className="w-full px-2 py-1.5 border-2"
                    placeholder="Nhập tiêu đề"
                    {...register("title", { required: true, minLength: 6, maxLength: 100 })}
                />
                {(errors.title) && <span className="text-red-500">Không được để trống</span>}

                <textarea
                    className=" px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    placeholder="Nhập nội dung"
                    {...register("content", { required: true })}
                />
                {(errors.content) && <span className="text-red-500">Không được để trống</span>}

                <input
                    type="date"
                    className="w-full px-2 py-1.5 border-2"
                    {...register("published_ad")}
                />

                <div className="text-center">
                    <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-red-500 text-white rounded-md w-32 mr-4">Thêm mới</button>
                    <Link to="/products" className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md">Quay lại</Link>
                </div>
            </form>
        </div>
    );
};

export default Add;
