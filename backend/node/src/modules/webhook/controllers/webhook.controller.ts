import { Request, Response } from "express";
import { stripe } from "../../../libs/stripe";
import Stripe from "stripe";
import webhookServices from "../services/webhook.service";

class WebhookController {
  async handleStripeWebhook(req: Request, res: Response) {
    console.log(req.body);

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

      console.log("✅ Webhook signature verified.");

      await webhookServices.handleWebhooks(event);
      return res.status(200).json({ received: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new WebhookController();