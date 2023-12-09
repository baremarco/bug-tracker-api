import express from 'express';
import * as userController from '../controllers/user.controller';
import { methodNotAllowed } from '../middlewares/not-allowed';

export const router = express.Router();

router.route('/users').get(userController.list).all(methodNotAllowed);
