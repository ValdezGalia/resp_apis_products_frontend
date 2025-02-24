import { ActionFunctionArgs, Form, redirect, useFetcher, useNavigate } from "react-router"
import { formatCurrency } from "../helpers/formatCurrency"
import { Product } from "../types"
import { DeletedProduct } from "../services/ProductService"
import { useMemo } from "react"

type ProductDetailsProps = {
    product: Product
}

export const actionDeleted = async({params} : ActionFunctionArgs) => {
    if(params.id !== undefined){
        await DeletedProduct(Number(params.id));
    }

    return redirect('/');
}

export const ProductDetails = ({product} : ProductDetailsProps) => {
    const fetcher = useFetcher();
    const navigate = useNavigate();
    const isAvailable = useMemo(() => product.availability, [fetcher]);

    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button type="submit" name="id" value={product.id} className={`${isAvailable ? 'text-black hover:bg-black hover:text-white' : 'text-red-600 hover:bg-red-600 hover:text-white'} transition-all duration-300 rounded-lg p-2 text-xs uppercase font-bold w-full border border-black-100 cursor-pointer`}>
                        {isAvailable ? 'Disponible' : 'No disponible'}
                    </button>
                </fetcher.Form>
                
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex gap-2 items-center">
                    <button onClick={() => navigate(`/productos/${product.id}/editar`)} className="bg-indigo-600 transition-all duration-300 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-indigo-800 cursor-pointer">Editar</button>
                    <Form className="w-full" method="POST" action={`productos/${product.id}/eliminar`} onSubmit={(e) => {if(!confirm('¿Desea eliminar el producto?')) e.preventDefault()}}>
                        <input type="submit" value="Eliminar" className="bg-red-600 transition-all duration-300 text-white rounded-lg w-full p-2 uppercase font-bold text-xs text-center hover:bg-red-800 cursor-pointer" />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}
