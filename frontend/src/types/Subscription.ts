export interface Subscription {
    id: string;
    userId: string;
    stripeCustomerId: string;
    stripeSubscriptionId: string;
    stripePriceId: string;
    stripeCurrentPeriodEnd: string;
    createdAt: string;
    updatedAt: string;
};