import { ActionFunctionArgs, Form, Link, redirect, useActionData } from "react-router"
import { ErrorMessage, ProductForm } from "../components";
import { addProduct } from "../services/ProductService";

export const action = async({request} : ActionFunctionArgs) => {
    const data = Object.fromEntries(await request.formData());
    let error = '';
    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios';
    }
    if(error.length){
        return error;
    }

    await addProduct(data);

    return redirect('/');
}

export const NewProducts = () => {
    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar Producto</h2>
                <Link to={'/'} className="rounded-md bg-indigo-600 p-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-500">
                    Volver a Productos
                </Link>
            </div>
            {
                error && <ErrorMessage>{error}</ErrorMessage>
            }
            <Form method="POST" className="mt-10">

                <ProductForm />

                <input type="submit" className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded" value="Registrar Producto"/>
            </Form>
        </>
    )
}
