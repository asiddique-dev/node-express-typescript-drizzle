import express from 'express';
import { getProducts, addProduct, editProduct, deleteProduct } from '../db/products';
import { numeric } from 'drizzle-orm/pg-core';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const products = await getProducts();

        return res.status(200).json(products);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const addNewProduct = async (req: express.Request, res: express.Response) => {
    try {
        //validate req.body data
        const product = await addProduct(req.body);

        return res.status(200).json(product);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const edit = async (req: express.Request, res: express.Response) => {
    try {
        //validate req
        const users = await editProduct(req.params.id,req.body);

        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};

export const deleteProductById = async (req: express.Request, res: express.Response) => {
    try {
        //validate valid uuid to delete product by id
        const users = await deleteProduct(req.params.id);

        return res.status(200).json(users);
    } catch (e) {
        console.log(e);
        return res.sendStatus(400);
    }
};
