import Stripe from "stripe";
import { stripe } from "../../../libs/stripe";
import webhookRepository from "../repositories/webhook.repository";
import { UserSubScriptionDTO } from "../dto/webhook.dto";

import { prisma } from "../../../libs/prisma";

class WebhookServices {

  async handleWebhooks(event: Stripe.Event) {
    const eventType = event.type;

    const session = event.data.object as Stripe.Checkout.Session;;
    let userId = '';
    
    // Handle different event types
    if (eventType === 'checkout.session.completed') {
      console.log('✅ Checkout session completed');
      console.log()
      console.log('userId', session.metadata);
    
      userId = session.metadata && session.metadata.userId ? session.metadata.userId : '';

      const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      console.log('📦 Subscription fetched:', subscription.id);

      // Check if the subscription already exists in the database
      const existingSubscription = await webhookRepository.getSubscriptionById(subscription.id);
      if (existingSubscription) {
        await webhookRepository.updateSubscriptionFromInvoice(subscription.id, {
          stripeCustomerId: subscription.customer as string,
          stripePriceId: subscription.items.data[0].price.id,
          stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
          updatedAt: new Date(),
        });

        console.log('✅ Subscription updated successfully');
        return;
      }

      const newSubscription = {
        userId: userId,
        createdAt: new Date(), 
        updatedAt: new Date(),
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end * 1000),
      };
      await webhookRepository.createSubscriptionFromSession(newSubscription);

      console.log('✅ Subscription created sucessfully');
    }

    

    if (eventType === 'invoice.payment_succeeded') {

      const invoice = event.data.object as Stripe.Invoice;

      const subscriptionId = invoice.parent?.subscription_details?.subscription ? (invoice.parent?.subscription_details?.subscription as string) : null;
      if (!subscriptionId) {
        console.warn('❗ Subscription ID missing from invoice.');
        return;
      }

      console.log('✅ Subscription updated from invoice');

    }

    // Respond to Stripe to acknowledge receipt of the event

  }
}

export default new WebhookServices();