import {Router} from 'express';
import { authenticateJWT } from '../../../middleware/user.auth.middleware';
import subscriptionController from '../controllers/subscription.controller';

const subscriptionRouter = Router();

subscriptionRouter.get(
    '/stripe/create-checkout-session', 
    authenticateJWT as any, 
    subscriptionController.subscriptionCheckOutController as any
);
subscriptionRouter.get(
    '/subscribed-user', 
    authenticateJWT as any, 
    subscriptionController.getSubscribedUserByUserIdController as any
);


export default subscriptionRouter;