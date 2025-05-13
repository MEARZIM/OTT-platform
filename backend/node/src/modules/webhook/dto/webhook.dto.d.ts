export interface UserSubScriptionDTO{
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    stripePriceId: string | null;
    stripeCurrentPeriodEnd: Date | null;
}