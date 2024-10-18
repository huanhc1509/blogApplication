import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../interface/product'
import { ProductCt } from '../ProductContex'

const List = () => {
    const { products, onDelete } = useContext(ProductCt)

    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return 'Chưa có ngày phát hành';
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const filteredProducts = products.filter((product: IProduct) => {
        const publishedDate = new Date(product.published_ad || '');

        if (!startDate && !endDate) return true;

        const startCheck = startDate ? new Date(startDate) <= publishedDate : true;
        const endCheck = endDate ? new Date(endDate) >= publishedDate : true;

        return startCheck && endCheck;
    });

    const truncateContent = (content: string) => {
        return content.length > 100 ? content.substring(0, 100) + '...' : content;
    };

    return (
        <div className='max-w-screen-xl flex flex-col justify-center mx-auto text-center py-8 gap-8'>
            <h1 className='text-4xl text-blue-500'>Danh sách bài viết</h1>
            <div>
                <Link className='text-2xl text-red-500' to={`add`}>Thêm bài viết</Link>
            </div>

            <div className='flex justify-center items-center gap-4 mt-4'>
                <div>
                    <label htmlFor="start-date" className='mr-2'>Từ ngày:</label>
                    <input
                        type="date"
                        id="start-date"
                        className='border p-2'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="end-date" className='mr-2'>Đến ngày:</label>
                    <input
                        type="date"
                        id="end-date"
                        className='border p-2'
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
            </div>

            <table className='border divide-y mt-4 w-full'>
                <thead>
                    <tr className='bg-gray-200'>
                        <th className='px-6 py-3'>STT</th>
                        <th className='px-6 py-3'>Tiêu đề</th>
                        <th className='px-6 py-3'>Nội dung</th>
                        <th className='px-6 py-3'>Thời gian</th>
                        <th className='px-6 py-3'>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product: IProduct, index: number) => (
                            <tr className='border' key={index}>
                                <td className='px-6 py-3'>{index + 1}</td>
                                <td className='px-6 py-3'>{product.title}</td>
                                <td className='px-6 py-3'>{truncateContent(product.content)}</td>
                                <td className='px-6 py-3'>{formatDate(product.published_ad)}</td>
                                <td className='px-6 py-3 flex flex-col'>
                                    <Link className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" to={`detail/${product.id}`}>Chi tiết</Link>
                                    <Link className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2" to={`edit/${product.id}`}>Sửa</Link>
                                    <button
                                        className="text-white bg-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                                        onClick={() => onDelete(product.id)}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className='px-6 py-3'>Không có bài viết nào trong khoảng thời gian đã chọn</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default List;
