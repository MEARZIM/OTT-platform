import { XCircle } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Link } from "react-router-dom";

export default function Cancel() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg max-w-md w-full p-8 text-center">
        <div className="mb-4 animate-pulse text-red-500 flex justify-center">
          <XCircle size={64} />
        </div>
        <h2 className="text-2xl font-semibold mb-2">Payment Cancelled</h2>
        <p className="text-zinc-400 mb-6">
          Your payment was not completed. No changes were made to your subscription.
        </p>
        <Link to="/subscription">
          <Button className="w-full bg-white text-black hover:bg-zinc-200">
            Try Again
          </Button>
        </Link>
      </div>
    </div>
  );
}
