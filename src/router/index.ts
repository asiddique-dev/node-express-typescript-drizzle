import express from 'express';
import { login, register } from '../controllers/authentication';
import { getAllUsers } from '../controllers/users';
import { isAuthenticated } from '../middleware';
import { getAllProducts, edit, deleteProductById, addNewProduct } from '../controllers/products';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/users', isAuthenticated, getAllUsers);

router.get('/products', isAuthenticated, getAllProducts);
router.put('/products:id', isAuthenticated, edit);
router.post('/products', isAuthenticated, addNewProduct);
router.delete('/products:id', isAuthenticated, deleteProductById);

export default router;
