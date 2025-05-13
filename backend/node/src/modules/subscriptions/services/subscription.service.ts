

import { stripe } from "../../../libs/stripe";
import subscriptionRepository from "../repositories/subscription.repository";
import { UserSubScription } from "@prisma/client";



class SubscriptionServices {
    async createCheckoutSubscription(userId: string){
        const userSubScription = await subscriptionRepository.getSubscriptionByUserId(userId);
        if(userSubScription && userSubScription.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubScription.stripeCustomerId,
                return_url: process.env.STRIPE_RETURN_URL
            })

            return stripeSession.url;
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: `${process.env.FRONTEND_URL}/subscription-success`,
            cancel_url: `${process.env.FRONTEND_URL}/subscription-cancel`,

            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [{

                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Primeview',
                        description: 'Enjoy the best streaming experience with Primeview',
                    },
                    unit_amount: 999,
                    recurring: {
                        interval: 'month',
                    },
                },
                quantity: 1

            }],

            metadata:{
                userId: userId
            }

        })

        return stripeSession.url;
        
    }

    async getSubscribedUserByUserId(userId: string): Promise<UserSubScription | null> {
        return await subscriptionRepository.getSubscriptionByUserId(userId);
    }
}

export default new SubscriptionServices();