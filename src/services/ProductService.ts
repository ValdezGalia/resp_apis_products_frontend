import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from "../types"
import { getEnvVariable } from "../helpers/getEnvVariable"
import { toBoolean } from "../helpers/formatBoolean"
import { safeParse } from "valibot"
import axios from "axios"

type ProductData = {
    [k: string]: FormDataEntryValue
}

const { VITE_API_URL } = getEnvVariable();

export const addProduct = async(data : ProductData) => {
    try {
        const { success, output } = safeParse(DraftProductSchema, {
            name: data.name,
            price: Number(data.price)
        });
        
        if(success) {
            const url = `${VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: output.name,
                price: output.price 
            });
        }else{
            throw new Error('Datos no válidos');
        }
    } catch (error) {
        console.log(error)
    }
}

export const getProducts = async() => {
    try {
        const url = `${VITE_API_URL}/api/products`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductsSchema, data.data);
        if( result.success ){
            return result.output;
        }else{
            throw new Error('Hubo un error...');
        }
    } catch (error) {
        console.log(error);
    }
}

export const getProductById = async(id: Product['id']) => {
    try {
        const url = `${VITE_API_URL}/api/products/${id}`;
        const { data } = await axios.get(url);
        const result = safeParse(ProductSchema, data.data);
        if( result.success ){
            return result.output;
        }else{
            throw new Error('Hubo un error...');
        }
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async(data : ProductData, id: Product['id']) => {
    try {
        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: Number(data.price),
            availability: toBoolean(data.availability.toString())
        });
        
        if(result.success) {
            const url = `${VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
        }

    } catch (error) {
        console.log(error);
    }
}

export const DeletedProduct = async(id: Product['id']) => {
    try {
        const product = await getProductById(id);
        if(!product){
            throw new Error('Producto no encontrado');
        }else{
            const url = `${VITE_API_URL}/api/products/${id}`;
            return await axios.delete(url);
        }
    } catch (error) {
        console.log(error);
    }
}

export const updatedAvailability = async(id: Product['id']) => {
    try {
        const url = `${VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
    } catch (error) {
        console.log(error);
    }
}