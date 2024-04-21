import { drizzle } from 'drizzle-orm/node-postgres';
import { InferModel, eq } from 'drizzle-orm';
import { pgTable, serial, text, uuid, varchar } from 'drizzle-orm/pg-core';
import { Pool } from 'pg';

export const products = pgTable('users', {
    id: uuid('id').primaryKey(),
    name: varchar('name').notNull(),
    model: varchar('model').notNull(),
    imgage: varchar('image').notNull(),
});

export type Product = InferModel<typeof products>;
export type NewProduct = InferModel<typeof products, 'insert'>;

const pool = new Pool({
    connectionString: process.env.DB,
});

const db = drizzle(pool);

export const getProducts = async () =>
    await db.select().from(products);

export const addProduct = async (newProduct: NewProduct) =>
    await db
        .insert(products)
        .values(newProduct)
        .returning();
export const editProduct = async (id: string, updatedProduct: Product) =>
    await db
        .update(products)
        .set(updatedProduct)
        .where(eq(products.id, id))
        .returning();

export const deleteProduct = async (id: string) =>
    await db
        .delete(products)
        .where(eq(products.id, id));
