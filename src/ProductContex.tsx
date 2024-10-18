import React, { createContext, useEffect, useState } from 'react'
import { IProduct } from './interface/product'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

type Props = {
    children: React.ReactNode
}
export const ProductCt = createContext({} as any)

const ProductContext = ({ children }: Props) => {
    const [products, setProduct] = useState<IProduct[]>([])
    const navigate = useNavigate()
    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get("http://localhost:3000/products")
                setProduct(data)
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    const onDetail = async (id: number | string) => {
        try {
            const { data } = await axios.get(`products/${id}`)
            setProduct(data)
        } catch (error) {
            console.log(error);
        }
    }
    const onAdd = async (productData: IProduct) => {
        try {
            const { data } = await axios.post("http://localhost:3000/products", productData)
            setProduct([...products, data])
            alert("Thêm thành công")
            navigate("/products")
        } catch (error) {
            console.log(error);

        }
    }
    const onEdit = async (productData: IProduct, id: number) => {
        try {
            const { data } = await axios.put("http://localhost:3000/products/" + id, productData)
            const newProduct = products.map(products => (products.id == id) ? data : products)
            setProduct(newProduct)
            alert("Sửa thành công")
            navigate("/products")
        } catch (error) {
            console.log(error);

        }
    }
    const onDelete = async (id: number) => {
        try {
            if (confirm("Bạn chắc muốn xóa chứ")) {
                await axios.delete("http://localhost:3000/products/" + id)
                const newProduct = products.filter(products => (products.id !== id))
                setProduct(newProduct)
                alert("Xóa thành công")
            }
        } catch (error) {
            console.log(error);

        }
    }

    return (
        <ProductCt.Provider value={{ products, onAdd, onEdit, onDelete, onDetail }}>{children}</ProductCt.Provider>
    )
}

export default ProductContext