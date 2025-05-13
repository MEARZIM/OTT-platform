"use client"

import { useState, useEffect } from "react"

import { WaitlistForm } from "./waitlist-form"

export function WaitlistSignup() {
  const [waitlistCount, setWaitlistCount] = useState(0)

  useEffect(() => {
    //getWaitlistCount().then((count) => setWaitlistCount(count + 100))
  }, [])

  const handleSuccess = (count: number) => {
    setWaitlistCount(count + 100)
  }

  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-br from-gray-200 to-gray-600">
            Join PrimeView
          </h2>
        </div>
        <div>
          <p className="text-lg sm:text-xl mb-8 text-gray-300">
            Your ultimate destination for premium entertainment. Join thousands of others already enjoying prime content.
          </p>
        </div>
        
      </div>
      {/* <div className="pt-8 flex justify-center space-x-6">
        <SocialIcon href="https://x.com" aria-label="X (formerly Twitter)" icon={<X className="w-6 h-6" />} />
        <SocialIcon href="https://instagram.com" aria-label="Instagram" icon={<Instagram className="w-6 h-6" />} />
        <SocialIcon href="https://facebook.com" aria-label="Facebook" icon={<Facebook className="w-6 h-6" />} />
        <SocialIcon href="https://linkedin.com" aria-label="LinkedIn" icon={<Linkedin className="w-6 h-6" />} />
      </div> */}
    </div>
  )
}
