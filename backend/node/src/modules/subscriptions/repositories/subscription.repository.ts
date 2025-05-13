import { UserSubScription } from "@prisma/client";
import {prisma} from "../../../libs/prisma";

class SubscriptionRepository{
    async createSubscription(subscription: UserSubScription): Promise<any> {
        // Logic to create a subscription in the database
        return await prisma.userSubScription.create({
            data: subscription
        })
    }

    async getSubscriptionByUserId(userId: string){
        // Logic to get a subscription by ID from the database
        return await prisma.userSubScription.findUnique({
            where: { userId: userId! }
        })
    }
}

export default new SubscriptionRepository();