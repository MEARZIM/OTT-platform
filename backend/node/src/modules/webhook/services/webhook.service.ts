import Stripe from "stripe";
import { stripe } from "../../../libs/stripe";
import webhookRepository from "../repositories/webhook.repository";

class WebhookServices{

    async handleWebhooks(event: Stripe.Event){
        const eventType = event.type;
        const session = event.data.object as Stripe.Checkout.Session;

      // Handle different event types
      if (eventType === 'checkout.session.completed') {
        console.log('✅ Checkout session completed');
        console.log('📧 Email:', session?.metadata?.email);

        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        console.log('📦 Subscription fetched:', subscription.id);
      }

      if (eventType === 'invoice.payment_succeeded') {
        
        const subscription = await stripe.subscriptions.retrieve( 
            session.subscription as string
        )

        await webhookRepository.updateSubscriptionFromInvoice(
            subscription.id,
            {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.items.data[0].current_period_end *1000),
            }
        );

        console.log('✅ Subscription updated from invoice');

      }

      // Respond to Stripe to acknowledge receipt of the event

    }
}

export default new WebhookServices();