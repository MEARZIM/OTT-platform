import express, {Router} from 'express';
import { authenticateJWT } from '../../../middleware/user.auth.middleware';
import webhookController from '../controllers/webhook.controller';

const webhookRouter = Router();

webhookRouter.post(
    '/route',
    express.raw({ type: 'application/json' }),
    webhookController.handleStripeWebhook as any
)

export default webhookRouter;