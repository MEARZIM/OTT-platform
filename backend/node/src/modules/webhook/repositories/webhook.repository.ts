import { prisma } from "../../../libs/prisma";
import Stripe from "stripe";
import { stripe } from "../../../libs/stripe";
import { UserSubScription } from "@prisma/client";

class WebhookRepository {
    async createSubscriptionFromSession(data: UserSubScription ) {

        return await prisma.userSubScription.create({
            data
        });
    }

    async updateSubscriptionFromInvoice(subscriptionId: string,data: Partial<UserSubScription>) {
        

        return await prisma.userSubScription.update({
            where: {
                stripeSubscriptionId :subscriptionId
            },
            data
        });
    }
}

export default new WebhookRepository();
