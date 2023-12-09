import express from 'express';
import * as projectController from '../controllers/project.controller';
import { methodNotAllowed } from '../middlewares/not-allowed';

export const router = express.Router();

router.route('/projects').get(projectController.list).all(methodNotAllowed);
