import express from 'express';
import * as bugController from '../controllers/bug.controller';
import { methodNotAllowed } from '../middlewares/not-allowed';

export const router = express.Router();

router.route('/bug').post(bugController.create).all(methodNotAllowed);
router
  .route('/bug/:id')
  .patch(bugController.update)
  .delete(bugController.remove)
  .all(methodNotAllowed);
router.route('/bugs').get(bugController.list).all(methodNotAllowed);
