import { Request, Response } from "express";
import { stripe } from "../../../libs/stripe";
import Stripe from "stripe";
import webhookServices from "../services/webhook.service";

class WebhookController {
    async handleStripeWebhook(req: Request, res: Response) {
        const sig = req.headers["stripe-signature"];
        if (typeof sig !== "string") {
          return res.status(400).send("Missing or invalid Stripe signature");
        }
        
        let event: Stripe.Event;

      try {
        event = stripe.webhooks.constructEvent(
          req.body,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET as string
        );
      } catch (err) {
        console.error("⚠️ Webhook signature verification failed.", err);
        return res.status(400).send(`Webhook Error: ${err instanceof Error ? err.message : "Unknown error"}`);
      }
  
      try {
        await webhookServices.handleWebhooks(event);
        return res.status(200).json({ received: true });
      } catch (err) {
        console.error("❌ Error processing webhook event:", err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
}

export default new WebhookController();