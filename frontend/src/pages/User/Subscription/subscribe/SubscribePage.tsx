import { Link } from "react-router-dom"
import { PricingCard } from "../components/PricingCard"
import { ArrowLeft } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "Free",
    isFree: true,
    features: [
      "Standard definition (SD) streaming",
      "Watch on one device at a time",
      "Access to limited content library",
      "Ad-supported viewing experience",
      "New releases with 30-day delay",
      "Mobile and tablet streaming",
    ],
  },
  {
    name: "Premium",
    price: 9.99,
    period: "month",
    featured: true,
    features: [
      "HD and 4K Ultra HD streaming",
      "Watch on up to 4 devices at the same time",
      "Access to full content library",
      "Ad-free viewing experience",
      "New releases on day one",
      "Download shows to watch offline",
      "Stream on all devices (TV, mobile, tablet, web)",
    ],
  },
]

export default function SubscribePage() {
    return (
      <div className="min-h-screen bg-black text-white py-20 px-4 relative">
        {/* Header*/}
        <div className="absolute top-6 left-6 flex items-center">
          <Link to="/dashboard" className="mr-3 hover:opacity-80 transition">
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold">Subscription</h1>
        </div>
  
        {/* Main Content */}
        <div className="max-w-6xl mx-auto space-y-12 pt-24">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Choose Your Streaming Experience</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Enjoy unlimited entertainment with our flexible subscription options. Start with our free plan or upgrade
              for the ultimate ad-free experience.
            </p>
          </div>
  
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <PricingCard key={plan.name} {...plan} />
            ))}
          </div>
  
          <div className="text-center text-sm text-zinc-500 max-w-2xl mx-auto">
            <p>
              Prices may vary depending on your region. Some restrictions apply. Premium subscription automatically renews
              until cancelled.
            </p>
          </div>
        </div>
      </div>
    )
}
  