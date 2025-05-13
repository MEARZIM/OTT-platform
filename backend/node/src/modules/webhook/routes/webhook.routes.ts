import {Router} from 'express';
import { authenticateJWT } from '../../../middleware/user.auth.middleware';
import webhookController from '../controllers/webhook.controller';

const webhookRouter = Router();

webhookRouter.post(
    '/route',
    authenticateJWT as any,
    webhookController.handleStripeWebhook as any
)

export default webhookRouter;