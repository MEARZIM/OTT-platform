import {Router} from 'express';
import { authenticateJWT } from '../../../middleware/user.auth.middleware';
import subscriptionController from '../controllers/subscription.controller';

const subscriptionRouter = Router();

subscriptionRouter.get(
    '/create-checkout-session', 
    authenticateJWT as any, 
    subscriptionController.subscriptionCheckOutController as any
);


export default subscriptionRouter;