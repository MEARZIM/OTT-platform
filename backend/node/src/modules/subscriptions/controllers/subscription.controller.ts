import { Request, Response } from "express";
import subscriptionService from "../services/subscription.service";
import { User } from "@prisma/client";

class SubscriptionController{
    async subscriptionCheckOutController(req: Request, res: Response){
        const user = req.user as User;

        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }

        try{
            const sessionUrl = await subscriptionService.createCheckoutSubscription(user.id);
            return res.status(200).json({url: sessionUrl});
            
        }catch(e){
            console.error(e);
            return res.status(500).json({message: "Internal server error"});
        }

    }

    async getSubscribedUserByUserIdController(req: Request, res: Response){
        const user = req.user as User;

        if(!user){
            return res.status(401).json({message: "Unauthorized"});
        }

        try{
            const subscription = await subscriptionService.getSubscribedUserByUserId(user.id);
            return res.status(200).json(subscription);
            
        }catch(e){
            console.error(e);
            return res.status(500).json({message: "Internal server error"});
        }
    }

}

export default new SubscriptionController();