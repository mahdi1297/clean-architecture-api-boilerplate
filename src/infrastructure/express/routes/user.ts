import { Router } from 'express';
import { createUserControllerFactory } from '~/main/factories/user/create-user-controller-factory';
import { deleteUserByIdControllerFactory } from '~/main/factories/user/delete-user-by-id-controller-factory';
import { findUserByIdControllerFactory } from '~/main/factories/user/find-user-by-id-controller-factory';
import { updateUserControllerFactory } from '~/main/factories/user/update-user-controller-factory';
import { expressRouteAdapter } from '../adapters/express-route-adapter';

export const userRoutes = Router();

const { createUserController } = createUserControllerFactory();
const { findUserByIdController } = findUserByIdControllerFactory();
const { deleteUserByIdController } = deleteUserByIdControllerFactory();
const { updateUserController } = updateUserControllerFactory();

userRoutes.get('/:id', expressRouteAdapter(findUserByIdController));
userRoutes.post('/', expressRouteAdapter(createUserController));
userRoutes.delete('/:id', expressRouteAdapter(deleteUserByIdController));
userRoutes.put('/:id', expressRouteAdapter(updateUserController));
