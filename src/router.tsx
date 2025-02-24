import { createBrowserRouter } from "react-router";
import { Layout } from "./layouts/Layout";
import { loader as productsLoader, action as newProductAction, NewProducts, Products, EditProduct, loaderEdit, actionEdit, actionProducts } from "./views";
import { actionDeleted } from "./components";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Products />,
                loader: productsLoader,
                action: actionProducts
            },
            {
                path: 'productos/nuevo',
                element: <NewProducts />,
                action: newProductAction
            },
            {
                path: 'productos/:id/editar', // ROA Pattern - Resource-oriented design
                element: <EditProduct />,
                loader: loaderEdit,
                action: actionEdit
            },
            {
                path: 'productos/:id/eliminar',
                action: actionDeleted
            }
        ]
    }
])