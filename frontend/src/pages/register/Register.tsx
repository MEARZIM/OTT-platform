import { Link } from "react-router-dom"
import { SignUpForm } from "./components/SignUpForm"

export default function SignUpPage() {
  return (
    <div className="bg-gray-900">
      <header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
        <div className='flex items-center gap-10 z-50'>
          <Link to='/'>
            <img src='/assets/PrimeViewLogo.png' alt='Logo' className='size-15' />
          </Link>
        </div>
      </header>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>
    </div>
    
  )
}
