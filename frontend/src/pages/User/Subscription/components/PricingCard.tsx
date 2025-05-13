import axios from "axios"

import { Check } from "lucide-react"
import { Button } from "../../../../components/ui/button"

interface PricingCardProps {
  name: string
  price: number | string
  period?: string
  features: string[]
  featured?: boolean
  isFree?: boolean
}

export function PricingCard({ name, price, period, features, featured, isFree = false }: PricingCardProps) {

  const handleClick = async () => {
    // Handle the click event for the "Subscribe Now" button
    console.log("Subscribe Now clicked");
    try{
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/subscription/stripe/create-checkout-session`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
        }
      )

      window.location.href = res.data.url;

    }catch(e){
      console.error("Error subscribing:", e);
    }
  }

  return (
    <>
      <div className="relative p-6 bg-zinc-200 dark:bg-zinc-900 rounded-lg border border-zinc-400 dark:border-zinc-800 h-full flex flex-col">
        {featured && (
          <div className="absolute -top-2 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}
        <div className="space-y-6 flex-grow">
          <div>
            <h3 className="text-xl font-medium text-black dark:text-white">{name}</h3>
            <div className="mt-2 flex items-baseline">
              {typeof price === "string" ? (
                <span className="text-5xl font-bold tracking-tight text-black dark:text-white">{price}</span>
              ) : (
                <>
                  <span className="text-5xl font-bold tracking-tight text-black dark:text-white">${price}</span>
                  {period && <span className="ml-1 text-sm font-medium text-zinc-500">/{period}</span>}
                </>
              )}
            </div>
          </div>
          <ul className="space-y-3 mt-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          className={`w-full mt-8 ${isFree
            ? "bg-zinc-700 dark:bg-zinc-400"
            : "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
            }`}
          onClick={() => {
            if (!isFree) {
              handleClick();
            }
          }}
        >
          {isFree ? "Stay Basic" : "Subscribe Now"}
        </Button>
      </div>
    </>
  )
}
