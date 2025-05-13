import { prisma } from "../../../libs/prisma";
import Stripe from "stripe";
import { stripe } from "../../../libs/stripe";
import { UserSubScriptionDTO } from "../dto/webhook.dto";

class WebhookRepository {
  async createSubscriptionFromSession(data: UserSubScriptionDTO) {

    return await prisma.userSubScription.create({
      data
    });
  }

  async getSubscriptionById(subscriptionId: string) {
    return await prisma.userSubScription.findUnique({
      where: { stripeSubscriptionId: subscriptionId }
    });
  }



  async updateSubscriptionFromInvoice(subscriptionId: string, data: Partial<UserSubScriptionDTO>) {



    return await prisma.userSubScription.update({
      where: { stripeSubscriptionId: subscriptionId },
      data
    });
  }
}

export default new WebhookRepository();
