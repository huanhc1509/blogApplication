import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IProduct } from '../interface/product'
import { ProductCt } from '../ProductContex'

const Detail = () => {
    const { id } = useParams<{ id: string }>()
    const { products } = useContext(ProductCt)

    // Tìm sản phẩm theo id
    const product = products.find((p: IProduct) => p.id.toString() === id)

    if (!product) {
        return <div className="text-center mt-8">Sản phẩm không tồn tại!</div>
    }

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Chưa có ngày phát hành';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className='max-w-screen-lg flex flex-col justify-center mt-8 mx-auto gap-8'>
            <h1 className='text-4xl font-bold text-center'>Chi tiết sản phẩm</h1>
            <div className='border rounded-lg p-6 bg-white shadow-lg'>
                <div className='mb-4'>
                    <h2 className='text-2xl font-semibold'>Tiêu đề: {product.title}</h2>
                </div>
                <div className='mb-4'>
                    <p className='text-lg'><strong>Nội dung:</strong> {product.content}</p>
                </div>
                <div className='mb-4'>
                    <p className='text-lg'><strong>Thời gian phát hành:</strong> {formatDate(product.published_ad)}</p>
                </div>
                <div className='text-center mt-8'>
                    <Link to={`/edit/${product.id}`} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md mr-4">Chỉnh sửa</Link>
                    <Link to="/products" className="px-4 py-2 bg-gray-500 hover:bg-gray-700 text-white rounded-md">Quay lại</Link>
                </div>
            </div>
        </div>
    )
}

export default Detail
